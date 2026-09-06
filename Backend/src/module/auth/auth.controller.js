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

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
    })

    res.cookie("accessToken", refreshToken, {
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

const uploadAvatar = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return ApiError.badRequest(res, 'No file uploaded, please send file with field name "avatar"')
        }

        const result = await authService.avatarUpload(req.user.id, file);

        return ApiResponse.ok(res, "Avatar uploaded successfully", { avatarUrl: result.url })

    } catch (error) {
        console.error("Upload error", error)
        return ApiError.internal(res, error.message || "Failed to upload avatar")
    }
}

export { register, login, logout, getMe, uploadAvatar }