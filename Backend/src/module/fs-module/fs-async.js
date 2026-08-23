import fs from "node:fs"

// 1. write
// fs.writeFile("async.txt", "Hello from fs-async", (err) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log("file written successfuly")
// })

//2. read
fs.readFile("async.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data)
})