import ApiError from '../utils/api-error.js'


// Takes the registerDto as an input 
// takes error and value 
//if error throw error
// else put the validated value in req.body and pass on to next
const validate = (Dtoclass) => {
    return (req, res, next) => {

        const { error, value } = Dtoclass.validate(req.body);

        if (error) {
            throw ApiError.badRequest(errors.join(";"))
        }

        req.body = value;
        next();
    }
}

export default validate;