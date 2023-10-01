"use client";

import type { AppRouter } from "@dashbored/api";
import { loggerLink } from "@trpc/client";
import { experimental_createTRPCNextAppDirClient as createTRPCNextAppDirClient } from "@trpc/next/app-dir/client";
import superjson from "superjson";

import { endingLink } from "./trpc-ending-links";

export const api = createTRPCNextAppDirClient<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        endingLink(),
      ],
    };
  },
});

export { type RouterInputs, type RouterOutputs } from "@dashbored/api";
