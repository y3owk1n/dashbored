import type { HTTPBatchLinkOptions, HTTPHeaders, TRPCLink } from "@trpc/client";
import { httpBatchLink } from "@trpc/client";

import type { AppRouter } from "@dashbored/api";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  const vc = process.env.VERCEL_URL;
  if (vc) return `https://${vc}`;
  return `http://localhost:3000`;
};

export const endingLink = (opts?: { headers?: HTTPHeaders }) =>
  ((runtime) => {
    const sharedOpts = {
      headers: opts?.headers, // REMINDER: fails when trying to `getTotalActiveMonitors()`
    } satisfies Partial<HTTPBatchLinkOptions>;

    const link = httpBatchLink({
      ...sharedOpts,
      url: `${getBaseUrl()}/api/trpc`,
    })(runtime);

    return (ctx) => {
      const path = ctx.op.path.split(".") as [string, ...string[]];

      const newCtx = {
        ...ctx,
        op: { ...ctx.op, path: path.join(".") },
      };
      return link(newCtx);
    };
  }) satisfies TRPCLink<AppRouter>;
