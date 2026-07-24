import joi from 'joi';
import baseDto from '../../../common/dto/base.dto.js';

class RegisterDto extends baseDto() {
    static schema = joi.object({
        name: joi.String().trim().min(2).max(50).required(),
        email: joi.String().email().min(8).max(50).required().lowercase(),
        password: joi.String().min(8).max(50).required().message("Password must contain minimum 8 characters"),
        role: joi.String().valid('customer', 'seller').default('customer')

    })
}

export default RegisterDto;