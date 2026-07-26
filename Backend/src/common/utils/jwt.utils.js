import crypto from 'crypto'
import jwt from 'jsonwebtoken'


//Generate Access Token
const generateAccessToken = (payload) => {

    //Synchronously sign the payload with JWT
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m'
    }) // The token is generated in this format (header.payload.signature)

}

const verifyAccessToken = (token) => {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET)
}


//Generate Refresh Token
const generateRefreshToken = (payload) => {

    //Synchronously sign the payload with JWT
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    }) // The token is generated in this format (header.payload.signature)

}

const verifyRefreshToken = (token) => {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}



const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto
        .createHash('sha256') // algorithm for hashing 
        .update(rawToken)
        .digest('hex')

    return (rawToken, hashedToken)
}

export {
    generateResetToken,
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken
}