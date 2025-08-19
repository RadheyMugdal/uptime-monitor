import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";
import { incident, monitor } from "@/server/db/schema";
import { count, desc, eq } from "drizzle-orm";
import { DEFAULT_PAGE_SIZE } from "@/modules/incidents/constants";

export const incidentRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({
        page: z.number().optional().default(0),
        search: z.string().optional().default(""),
    })).query(async ({ ctx, input }) => {
        const incidents = await db
            .select({
                id: incident.id,
                monitorId: incident.monitorId,
                monitorName: monitor.name,
                status: incident.status,
                startAt: incident.startAt,
                endAt: incident.endAt,
                errorMessage: incident.errorMessage,
                createdAt: incident.createdAt,
            })
            .from(incident)
            .innerJoin(monitor, eq(incident.monitorId, monitor.id))
            .where(eq(incident.userId, ctx.user.id))
            .orderBy(desc(incident.createdAt))
            .limit(DEFAULT_PAGE_SIZE)
            .offset(input.page * DEFAULT_PAGE_SIZE);

        const [totalIncidents] = await db.select({ count: count(incident.id) }).from(incident).where(eq(incident.userId, ctx.user.id))

        return {
            incidents,
            totalPages: Math.ceil((totalIncidents?.count || 0) / DEFAULT_PAGE_SIZE)
        };
    })

})