import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    // On the go validation almost 90% mongoose done
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
        required: [true, "Name is required"]
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        minlength: 8,
        required: [true, "password is required"],
        select: false // it indicated this field should not be returned 
    },

    type: {
        type: String,
        enum: ["customer", "seller", "admin"],
        default: 'customer'
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    verficationToken: {
        type: String,
        select: false
    },

    refreshToken: {
        type: String,
        select: false
    },

    resetPasswordToken: {
        type: String,
        select: false
    },

    resetPasswordExpiresToken: {
        type: String,
        select: false
    },

}, { timestamps: true })

export default mongoose.model("User", userSchema)