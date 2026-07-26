
import ApiError from '../../common/utils/api-error';
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from '../../common/utils/jwt.utils.js';
import User from './auth.model.js'

const heshedToken = (token) => {
    return crypto
        .createHash('sha256') // algorithm for hashing 
        .update(rawToken)
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
    delete userObj.password;
    delete userObj.verificationToken;


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

    if (!user.isVerified) throw ApiError.forbidden("Please verify email before login")

    const accessToken = generateAccessToken({ id: user._id })

    const refreshToken = generateRefreshToken({ id: user._id })

    user.refreshToken = hashedToken(refreshToken);

    //validateBeforeSave is a flag that tells mongoose to not validate everything just validate the updated thing 
    await user.save({ validateBeforeSave })

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

export { register }