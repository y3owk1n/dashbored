import { authRouter } from "./router/auth";
import { spaceRouter } from "./router/space";
import { workspaceRouter } from "./router/workspace";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  workspace: workspaceRouter,
  space: spaceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
