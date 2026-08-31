import multer from "multer";


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

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const allowed = ["image/png", "image/jpeg", "image/gif", "image/webp"]

        if (allowed.includes(file.mimetype)) {
            cb(null, true)
        }
        else {
            cb(new Error("File type not supported"), false)
        }
    }
})