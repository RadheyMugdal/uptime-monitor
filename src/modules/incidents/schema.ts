import type { AppRouter } from "@/server/api/root";
import type { RouterOutputs } from "@/trpc/react";
import type { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>
export type Incident = RouterOutput["incident"]["getAll"]["incidents"][0]