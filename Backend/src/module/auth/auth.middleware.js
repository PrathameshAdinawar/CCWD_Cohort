import ApiError from "../../common/utils/api-error";
import { verifyAccessToken } from "../../common/utils/jwt.utils";
import User from "./auth.model"

const authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw ApiError.unAuthorised("Not authenticated")

    const decodedValue = verifyAccessToken(token)

    const user = await User.findById(decodedValue.id)
    if (!user) throw ApiError.unAuthorised("User does not exist")

    req.user = {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    };
    next();
}

const authorize = (...role) => {
    return (req, res, next) => {
        if (!roles.include(req.user.role)) {
            throw ApiError.forbidden("You do not have permission to perform this action")
        }
        next()
    };
};

export { authenticate, authorize }