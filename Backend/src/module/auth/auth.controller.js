import * as authService from './auth.service.js'
import ApiResponse from '../../common/utils/api-repsonse.js'
import ApiError from '../../common/utils/api-error.js'

const register = async (req, res) => {
    const user = await authService.register(req.body)
    ApiResponse.created(res, 'Registration success', user)

}

const login = async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.login(req.body)
    // ApiResponse.created(res, 'Login success', user)

    res.cookie("refresh Token", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
    })

    res.cookie("access Token", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
    })

    ApiResponse.ok(res, "login successfull", { user, accessToken, refreshToken })
}

const logout = async (req, res) => {

    await authService.logout(req.user.id)
    res.clearCookie("refreshToken")
    ApiResponse.ok(res, 'logout success')
}

const getMe = async (req, res) => {
    const user = await authService.getMe(req.user.id);
    ApiResponse.ok(res, 'User Profile', user)
}

export { register, login, logout, getMe }