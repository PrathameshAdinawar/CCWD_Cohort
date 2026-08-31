import express from "express"
import cookieParser from 'cookie-parser'
import authRoute from './module/auth/auth.route.js'
import multer from 'multer'
import Apireponse from "./common/utils/api-repsonse.js"
import ApiError from "./common/utils/api-error.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const storage = multer.memorystorage();



const upload = multer();


app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file);

    Apireponse.ok(res, "File uploaded")
})


app.use("/api/auth", authRoute)


app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

// app.use(errorHandler);

export default app;