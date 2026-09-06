import multer from "multer";
import path from "path"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },

    // This part of filename is just avoid the same file name conflict
    // else 1st users data can get override by another one with same name
    filename: function (req, file, cb) {

        // without the extension the file we are uploading will be useless
        // so we extract the extension using the dependency "path"
        const ext = path.extname(file.originalname)

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const fileFilter = (req, file, cb) => {
    console.log("Uploaded file info:", file.originalname, file.mimetype)
    const allowedMimes = ["image/png", "image/jpeg", "image/gif", "image/webp"]
    const allowedExts = [".png", ".jpg", ".jpeg", ".gif", ".webp"]

    const ext = path.extname(file.originalname).toLowerCase()

    if (allowedMimes.includes(file.mimetype) || allowedExts.includes(ext)) {
        cb(null, true)
    }
    else {
        cb(new Error("File type not supported"), false)
    }
}



export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
})