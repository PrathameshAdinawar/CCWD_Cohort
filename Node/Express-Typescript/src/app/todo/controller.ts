import { todoValidationSchema, type Todo } from "../../validation/todo.Schema.js"
import type { Request, Response } from "express";

class TodoController {

    // This is inMem DB / Quick DB with validation Schema
    private _db: Todo[]

    constructor() {
        this._db = []
    }

    public handleGetAllTodos(req: Request, res: Response) {
        const getAllTodos = this._db;
        return res.json({ getAllTodos })
    }

    public async handleCreateTodo(req: Request, res: Response) {

        // TryCatch cause the validation can fail
        try {

            const unValidated = req.body  // Input data can be any type
            const validatedInput = await todoValidationSchema.parseAsync(unValidated) // so we use ValidationSchema here to validate
            this._db.push(validatedInput);
            return res.status(201).json({ todo: validatedInput })

        } catch (error) {
            return res.status(500).json({ error })
        }

    }

}

export default TodoController