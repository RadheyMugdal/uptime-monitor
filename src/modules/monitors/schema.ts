import type { AppRouter } from "@/server/api/root"
import type { inferRouterOutputs } from "@trpc/server"


type RouterOutput = inferRouterOutputs<AppRouter>

export type Monitor = RouterOutput["monitor"]["getAll"]["items"][0]

export type Monitors = Monitor[] 

