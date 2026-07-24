import * as authService from './auth.service.js'
import ApiResponse from '../../common/utils/api-repsonse.js'

const register = async (req, res) => {
    const user = await authService.register(req.body)
    ApiResponse.created(resizeBy, 'Registration success', user)
}

export { register }