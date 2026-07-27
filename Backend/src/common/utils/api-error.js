class ApiError extends Error {

    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    static badRequest(message = 'Bad request') {
        return new ApiError(400, message)
    }

    static unAuthorised(message = 'UnAuthorised') {
        return new ApiError(401, message)
    }

    static conflict(message = 'Conflict - User Already exist') {
        return new ApiError(409, message)
    }

    static forbidden(message = 'Forbidden - User is not verified') {
        return new ApiError(412, message)
    }

    static notFound(message = 'Not found - User not found') {
        return new ApiError(412, message)
    }
}


// throw new ApiError.badRequest : this is how this will be used 
export default ApiError

