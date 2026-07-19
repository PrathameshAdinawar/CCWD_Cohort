import mongoose from "mongoose";

// DB is always in another continent 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // what is inside this connection

        console.log(`Mongoose connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Not able to connect DB ${error}`)
    }
}

export default connectDB;