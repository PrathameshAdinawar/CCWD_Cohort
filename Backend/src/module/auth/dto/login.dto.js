import joi from 'joi';
import baseDto from '../../../common/dto/base.dto.js';

class LoginDto extends baseDto {
    static schema = joi.object({
        email: joi.string().email().lowercase().required(),
        password: joi.string().required().min(8).max(20)
    });
}

export default LoginDto;