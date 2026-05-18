import { publicProcedure, router } from "./trpc";
import { email, z } from "zod"

import { healthRouter } from "./routes/health/route";

export const serverRouter = router({
  health: healthRouter,
  chaicode: publicProcedure
    .meta({ openapi: { method: "GET", path: "/chaicode" } })
    .input(z.object({ email: z.email(), name: z.string() }))
    .output(z.object({ message: z.string() }))
    .query(({ input }) => {
      return {
        // Should not write business logic in route handler, this is just for demo purpose
        // this is just a signature 
        message: `Hello Mr.${input.email} ${input.name}`
      }
    }),

});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
