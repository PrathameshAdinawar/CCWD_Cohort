import express from "express";

// type is imp here as its from @types/express
import type { Application } from "express";
import todoRouter from "./todo/route.js";
import { json } from "zod";


export function createAServerApplication(): Application {

    const app = express()

    //#region //*========= Routes ========

    //express bydefault cannot accept the JSON format so we have to mention it 
    app.use(express.json())


    // This is a modular way to create a route with structure and maintainability in mind
    app.use('/todo', todoRouter)


    // === This is direct way to create a route without any modularity and structure ===
    // app.get('/', function (req, res) {
    //     return res.json({ message: 'Hello ji kaisa hooo ' })
    // })

    // app.get('/hello', function (req, res) {
    //     return res.json({ message: 'Bye' })
    // })


    //#endregion //*========= Routes ========


    return app;
}