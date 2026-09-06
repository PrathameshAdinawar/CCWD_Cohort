import "dotenv/config"
import app from "./src/app.js"
import mongoose from "mongoose"

const PORT = process.env.PORT || 5000;

const start = async () => {

    // Connect DB first
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected")

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} in ${process.env.NODE_ENV} mode`)
    })
}

start().catch((err) => {
    console.error("Failed to start server", err)
    process.exit(1)
})


