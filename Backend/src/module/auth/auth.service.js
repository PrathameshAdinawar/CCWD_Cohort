
import imagekit from '../../common/config/imagekit.js';
import ApiError from '../../common/utils/api-error.js';
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from '../../common/utils/jwt.utils.js';
import User from './auth.model.js'
import fs from "node:fs"
import crypto from "crypto"

const hashedToken = (token) => {
    return crypto
        .createHash('sha256') // algorithm for hashing 
        .update(token)
        .digest('hex')

}

const register = async ({ name, email, password, role }) => {

    const existing = await User.findOne({ email })
    if (existing) throw ApiError.conflict("User with this email already exists")

    const { rawToken, hashedToken } = generateResetToken()

    const user = await User.create({
        name: name,
        email: email,
        password: password,
        role: role,
        verificationToken: hashedToken
    })

    //TODO: send an email to user with token: rawToken

    // To keep things backend and not share on frontend we use this
    const useObj = user.toObject()
    delete useObj.password;
    delete useObj.verificationToken;


    return useObj;
}

const login = async ({ email, password }) => {
    // take email and find user in DB
    // then check if password is correct
    // check if the email is verified 

    // password can not be checked directly cause we have done select:false in model
    const user = await User.findOne({ email }).select("+password") //user holds the copy of DB
    if (!user) throw ApiError.unAuthorised("Invalid email or password")

    //assume password is checked

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw ApiError.unAuthorised("Invalid email or password")

    // if (!user.isVerified) throw ApiError.forbidden("Please verify email before login")

    const accessToken = generateAccessToken({ id: user._id })

    const refreshToken = generateRefreshToken({ id: user._id })

    user.refreshToken = hashedToken(refreshToken);

    //validateBeforeSave is a flag that tells mongoose to not validate everything just validate the updated thing 
    await user.save({ validateBeforeSave: false })

    const userObj = user.toObject()
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken }

}

const refresh = async (oldRefreshToken) => {
    if (!token) throw ApiError.unAuthorised("Refresh token missing")

    const decoded = verifyRefreshToken(oldRefreshToken)

    // when refreshtoken was generated payload was added so we can access that here  
    const user = await User.findById(decoded.id).select("+refreshToken")

    if (!user) throw ApiError.unAuthorised("User not found")

    if (user.refreshToken !== hashedToken(token)) {
        throw ApiError.unAuthorised("invalid refresh token")
    }

    const accessToken = generateAccessToken({ id: user._id })

    const refreshToken = generateRefreshToken({ id: user._id })

    user.refreshToken = hashedToken(refreshToken);

    //validateBeforeSave is a flag that tells mongoose to not validate everything just validate the updated thing 
    await user.save({ validateBeforeSave })

    return ({ accessToken, refreshToken })
}

const logout = async (userId) => {
    // const user = await User.findById(userId)
    // if(!user) ApiError.unAuthorised("user not found")

    // user.refreshToken = undefined;
    // await user.save({validateBeforeSave:false})

    await User.findByIdAndUpdate(userId, { refreshToken: null })
}

const forgotPassword = async (email) => {
    const user = await User.findOne(email)

    if (!user) throw ApiError.notFound("No account with this email")

    const { rawToken, hashedToken } = generateResetToken()
    user.resetPasswordToken = hashedToken
    user.resetPasswordExpiresToken = Date.now() + 15 * 60 * 1000

    await user.save()

    //Todo mail krenge ji baadme
}

const verifyEmail = async (token) => {
    const hashedToken = hashedToken(token)
    const user = await User.findOne({ verificationToken: hashedToken }).select("+verificationToken")

    //if user not found 
    user.isVerified = true
    user.verficationToken = undefined
    await user.save();
    return user;
}

const getMe = async (userId) => {
    const user = await User.findById(userId);
    if (!user) ApiError.notFound("user not found")

    return user


}

const avatarUpload = async (userId, file) => {
    try {
        const fileStream = fs.createReadStream(file.path)
        const uploadResponse = await imagekit.files.upload({
            file: fileStream,
            fileName: file.originalname,
            folder: "/user-avatars"
        })

        await User.findByIdAndUpdate(
            userId,
            { avatar: uploadResponse.url },
            { new: true }
        );

        fs.unlinkSync(file.path)

        return {
            url: uploadResponse.url,
            fileId: uploadResponse.fileId
        }
    } catch (error) {
        try {
            if (file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
        } catch (error) {
            console.error("Error deleting temp file", error)
        }
        throw error
    }
}

export { register, login, logout, refresh, forgotPassword, getMe, avatarUpload }