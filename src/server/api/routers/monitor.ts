import z from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { db } from "@/server/db"
import { checkResult, incident, monitor } from "@/server/db/schema"
import { and, count, desc, eq, gt, like, sql } from "drizzle-orm"
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/modules/monitors/constants"
import { monitorQueue } from "@/lib/queue"
import { TRPCError } from "@trpc/server"


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

        if (!createdMonitor) {
            throw new Error("Failed to create monitor.");
        }

        await monitorQueue.add(
            'check-monitor',
            { monitorId: createdMonitor.id },
            {
                jobId: `monitor-${createdMonitor.id}`,
                repeat: { every: createdMonitor.frequencyMinutes * 60 * 1000 },
                removeOnFail: true,
                removeOnComplete: true
            }
        )

        return;

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
        }).from(monitor).where(and(eq(monitor.userId, ctx.user.id), like(monitor.name, "%" + input.search + "%"))).limit(DEFAULT_PAGE_SIZE).offset(input.page * DEFAULT_PAGE)

        const [rowCount] = await db.select({ count: count(monitor.id) }).from(monitor).where(eq(monitor.userId, ctx.user.id))
        return {
            items: monitors,
            totalPages: Math.ceil((rowCount?.count || 0) / 10)
        }

    }),
    getMonitorsStatus: protectedProcedure.query(async ({ ctx }) => {
        const fill = {
            up: "green",
            down: "red",
            paused: "yellow",
            unknown: "gray"
        }
        const statusDataRaw = await db.select({
            status: monitor.status,
            count: count(monitor.id)
        }).from(monitor).where(eq(monitor.userId, ctx.user.id)).groupBy(monitor.status)

        const statusData = statusDataRaw.map(item => ({
            ...item,
            fill: fill[item.status as keyof typeof fill]
        }))

        const cuttOffDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const [last24HoursData] = await db
            .select({
                upMonitors: sql<number>`count(*) filter (where ${monitor.status} = 'up')`,
                downMonitors: sql<number>`count(*) filter (where ${monitor.status} = 'down')`,
                pausedMonitors: sql<number>`count(*) filter (where ${monitor.status} = 'paused')`,
                totalMonitors: count()
            })
            .from(monitor)
            .where(and(eq(monitor.userId, ctx.user.id), gt(monitor.createdAt, cuttOffDate)));

        return {
            statusData,
            last24HoursData
        }
    }),
    getMonitorById: protectedProcedure.input(z.object({
        id: z.string()
    })).query(async ({ ctx, input }) => {
        const [existingMonitor] = await db.select({
            id: monitor.id,
            name: monitor.name,
            url: monitor.url,
            frequencyMinutes: monitor.frequencyMinutes,
            status: monitor.status,
            expectedStatus: monitor.expectedStatus,
            method: monitor.method,
            headers: monitor.headers,
            body: monitor.body,
        }).from(monitor).where(eq(monitor.id, input.id)).limit(1)
        if (!existingMonitor) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Monitor not found' })
        }
        return {
            monitor: existingMonitor
        }
    }),
    getLatencyStatsById: protectedProcedure.input(z.object({
        id: z.string()
    })).query(async ({ ctx, input }) => {
        const cuttOffDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const data = await db.select({
            createdAt: checkResult.createdAt,
            responseMs: checkResult.responseMs,
        }).from(checkResult).where(and(eq(checkResult.monitorId, input.id), gt(checkResult.createdAt, cuttOffDate)))

        const [lastCheckResult] = await db.select({
            responseMs: checkResult.responseMs
        }).from(checkResult).where(eq(checkResult.monitorId, input.id)).orderBy(desc(checkResult.createdAt)).limit(1)

        const [averageResponseTime] = await db.select({
            avg: sql<number>`avg(${checkResult.responseMs})`
        }).from(checkResult).where(eq(checkResult.monitorId, input.id))

        const [minResponseTime] = await db.select({
            min: sql<number>`min(${checkResult.responseMs})`
        }).from(checkResult).where(eq(checkResult.monitorId, input.id))

        const [maxResponseTime] = await db.select({
            max: sql<number>`max(${checkResult.responseMs})`
        }).from(checkResult).where(eq(checkResult.monitorId, input.id))

        return {
            checkResults: data,
            lastCheckResultResponseTime: lastCheckResult?.responseMs,
            averageResponseTime: averageResponseTime?.avg,
            minResponseTime: minResponseTime?.min,
            maxResponseTime: maxResponseTime?.max

        }
    }),

    getMonitorPerformance: protectedProcedure.input(z.object({
        id: z.string()
    })).query(async ({ ctx, input }) => {
        const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const [incidentsCount] = await db.select({
            count: count(incident.id)
        }).from(incident).where(and(eq(incident.monitorId, input.id), gt(incident.createdAt, cutoffTime)))

        const [lastIncident] = await db.select({
            createdAt: incident.createdAt,
        }).from(incident).where(eq(incident.monitorId, input.id)).orderBy(desc(incident.createdAt)).limit(1)

        return {
            incidentsCount: incidentsCount?.count || 0,
            lastIncident
        }
    }),
    getLastFiveIncidents: protectedProcedure.input(z.object({
        id: z.string()
    })).query(async ({ ctx, input }) => {
        const incidents = await db.select().from(incident).where(eq(incident.monitorId, input.id)).orderBy(desc(incident.createdAt)).limit(5)
        return {
            incidents
        }
    }),
    pauseMonitor: protectedProcedure.input(z.object({
        id: z.string()
    })).mutation(async ({ ctx, input }) => {
        await db.update(monitor).set({ status: "paused" }).where(eq(monitor.id, input.id))
        await monitorQueue.remove(`monitor-${input.id}`)
        return true
    }),
    resumeMonitor: protectedProcedure.input(z.object({
        id: z.string()
    })).mutation(async ({ ctx, input }) => {
        const [data] = await db.update(monitor).set({ status: "up" }).where(eq(monitor.id, input.id)).returning()
        if (!data) throw new TRPCError({ code: 'NOT_FOUND', message: 'Monitor not found' })
        await monitorQueue.add(
            'check-monitor',
            { monitorId: input.id },
            {
                jobId: `monitor-${input.id}`,
                repeat: { every: data.frequencyMinutes * 60 * 1000 },
                removeOnFail: true,
                removeOnComplete: true
            }
        )
        return true
    }),
    updateMonitor: protectedProcedure.input(z.object({
        id: z.string(),
        name: z.string().optional(),
        url: z.string().optional(),
        frequencyMinutes: z.number().optional(),
        method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]).optional(),
        expectedStatus: z.number().optional(),
        body: z.string().optional(),
        headers: z.json().optional(),
    })).mutation(async ({ ctx, input }) => {
        const [data] = await db.update(monitor).set({
            name: input.name,
            url: input.url,
            frequencyMinutes: input.frequencyMinutes,
            method: input.method,
            expectedStatus: input.expectedStatus,
            body: input.body,
            headers: input.headers
        })
            .where(eq(monitor.id, input.id)).returning()
        if (!data) throw new TRPCError({ code: 'NOT_FOUND', message: 'Monitor not found' })
        await monitorQueue.remove(`monitor-${input.id}`)
    }),
    deleteMonitor: protectedProcedure.input(z.object({
        id: z.string()
    })).mutation(async ({ ctx, input }) => {
        await db.delete(monitor).where(eq(monitor.id, input.id)).returning()
        await monitorQueue.remove(`monitor-${input.id}`)
        return true
    }),
})
