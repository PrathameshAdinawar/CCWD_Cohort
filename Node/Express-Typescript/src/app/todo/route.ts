import { Router } from 'express'
import TodoController from './controller.js';

const router = Router();

//Here it becomes a detached function so when we call it, the context of this will be lost. So we need to bind the context of this to the controller instance. 
// So we use bind method to bind the context of this to the controller instance.
const Controller = new TodoController()

router.get('/', Controller.handleGetAllTodos.bind(Controller))  // bind is used to bind the context of this to the controller instance
// router.get('/:id')

router.post('/', Controller.handleCreateTodo.bind(Controller))

// router.put('/:id')

// router.delete('/:id')




export default router;