
import ApiError from '../../common/utils/api-error';
import { generateResetToken } from '../../common/utils/jwt.utils.js';
import User from './auth.model.js'

const register = async ({ name, email, password, role }) => {

    const existing = await User.findOne({ email })
    if (existing) throw ApiError.conflict("User with this email already exists")

    const { rawToken, hashedToken } = generateResetToken()

    await User.create({
        name: name,
        email: email,
        password: password,
        role: role,
        verificationToken: hashedToken
    })

    //TODO: send an email to user with token: rawToken

    const useObj = user.toObject()
    delete userObj.password;
    delete userObj.verificationToken;


    return useObj;
}

export { register }