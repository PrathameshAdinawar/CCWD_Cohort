import express from "express";

// type is imp here as its from @types/express
import type { Application } from "express";



export function createAServerApplication(): Application {

    const app = express()
    return app;
}