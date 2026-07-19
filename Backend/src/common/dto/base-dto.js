// Validator 
import Joi from "joi";

class baseDto {

    static schema = Joi.object({})

    static validate(data) {
        const { error, value } = this.schema.validate(data, {
            abortEarly: false,
            stripUnknown: true // any other field other than that are asked are removed 
        })

        if (error) {
            const error = error.details.map((d) => d.message);
            return { errors, value: null }
        }
        return { errors: null, value }
    }
}

export default baseDto;