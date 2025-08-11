import z from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { db } from "@/server/db"
import { monitor } from "@/server/db/schema"
import { and, count, eq, like } from "drizzle-orm"


export const monitorRouter = createTRPCRouter({
    create: protectedProcedure.input(
        z.object({
            name: z.string(),
            headers: z.json(),
            url: z.string(),
            method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]),
            expectedStatus: z.number(),
            body: z.json(),
            frequencyMinutes: z.number()
        })
    ).mutation(async ({ input, ctx }) => {
        const [createdMonitor] = await db.insert(monitor).values({
            name: input.name,
            headers: input.headers,
            url: input.url,
            method: input.method,
            expectedStatus: input.expectedStatus,
            body: input.body,
            frequencyMinutes: input.frequencyMinutes,
            userId: ctx.user.id
        }).returning({ id: monitor.id, frequencyMinutes: monitor.frequencyMinutes })

        // await inngest.send({
        //     name: `check-monitor-${createdMonitor.frequencyMinutes}-minutes`,
        //     data: {
        //         monitorId: createdMonitor.id
        //     }
        // })

        return {
            success: true
        }

    }),
    getAll: protectedProcedure.input(z.object({
        page: z.number().optional().default(0),
        search: z.string().optional().default(""),

    })).query(async ({ ctx, input }) => {
        const monitors = await db.select({
            id: monitor.id,
            name: monitor.name,
            url: monitor.url,
            frequencyMinutes: monitor.frequencyMinutes,
            status: monitor.status,
        }).from(monitor).where(and(eq(monitor.userId, ctx.user.id), like(monitor.name, "%" + input.search + "%")))

        const [rowCount] = await db.select({ count: count(monitor.id) }).from(monitor).where(eq(monitor.userId, ctx.user.id))
        return {
            items: monitors,
            totalPages: Math.ceil(rowCount?.count  || 0/ 10)
        }

    })
})