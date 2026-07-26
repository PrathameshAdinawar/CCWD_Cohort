// Validator 
import Joi from "joi";

class baseDto {

    static schema = Joi.object({}) //empty object

    static validate(data) {
        const { error, value } = this.schema.validate(data, {
            abortEarly: false, // to dont want to stop at first error, we want to get all errors
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