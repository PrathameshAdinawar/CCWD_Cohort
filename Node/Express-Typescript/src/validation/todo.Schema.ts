import { z } from 'zod'


export const todoValidationSchema = z.object({

    id: z.string().describe('Id of the todo'),
    title: z.string().describe('Titlw of the todo'),
    description: z.string().optional().describe('Description of the todo'),
    isCompleted: z.boolean().default(false).describe('if the todo is complete')

})


export type Todo = z.infer<typeof todoValidationSchema>

// ===  🚫 DRY principle === // Zod has a feature to create this typeings automatically 👆
// export interface ITodo {
//     id: string,
//     title: string
//     description?: string,
//     isCompleted: boolean
// }