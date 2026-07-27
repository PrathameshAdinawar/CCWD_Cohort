// Validator 
import Joi from "joi";
import bcrypt from 'bcryptjs'

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

// we should not store the password as it is so we Hash it 
// Even if the DB is compromised pasword of user is still confidential
userSchema.pre('save', async (next) => {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12)

    next();
})

// custom method using mongoose method  
userSchema.methods.comparePassword = async function (clearTextPassword) {
    bcrypt.compare(clearTextPassword, this.password)
}

export default baseDto;