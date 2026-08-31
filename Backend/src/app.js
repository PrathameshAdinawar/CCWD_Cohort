import express from "express"
import cookieParser from 'cookie-parser'
import authRoute from './module/auth/auth.route.js'

import multer from 'multer'
import Apireponse from "./common/utils/api-repsonse.js"
import ApiError from "./common/utils/api-error.js"
import path from "path"

import fs from "fs/promises"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Multer: middleware to handle multipart/form-data (file uploads), since Express can't parse it natively
//Storage config
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads')
//     },

//     // This part of filename is just avoid the same file name conflict
//     // else 1st users data can get override by another one with same name
//     filename: function (req, file, cb) {

//         // without the extension the file we are uploading will be useless
//         // so we extract the extension using the dependency "path"
//         const ext = path.extname(file.originalname)

//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix + ext)
//     }
// })


const storage = multer.memoryStorage();

//Disk storage: the data is stored even if the request ends 
const upload = multer({ storage });


// In-memory storage
// const upload = multer();

app.post("/upload", upload.single("file"), async (req, res) => {
    console.log(req.file.buffer);

    const ext = path.extname(req.file.originalname);

    const uniqueSuffix = `file-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`

    const filePath = `public/uploads/${uniqueSuffix}`

    await fs.writeFile(filePath, req.file.buffer)

    console.log(`file path ${filePath}`)

    Apireponse.ok(res, "File uploaded")
})


app.use("/api/auth", authRoute)


app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

// app.use(errorHandler);

export default app;