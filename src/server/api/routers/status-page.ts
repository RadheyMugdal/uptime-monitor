import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "@/server/db";
import { statusPage, statusPageMonitor } from "@/server/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { createStatusPageSchema, updateStatusPageSchema } from "@/modules/status-pages/validations";
import { TRPCError } from "@trpc/server";

export const statusPageRouter = createTRPCRouter({
    create: protectedProcedure
        .input(createStatusPageSchema)
        .mutation(async ({ ctx, input }) => {
            // Check slug uniqueness
            const existing = await db.query.statusPage.findFirst({
                where: (table, { eq }) => eq(table.slug, input.slug),
            });
            if (existing) {
                throw new TRPCError({ code: "CONFLICT", message: "Slug already exists" });
            }

            const [newPage] = await db.insert(statusPage).values({
                userId: ctx.user.id,
                title: input.title,
                slug: input.slug,
                description: input.description,
            }).returning();

            if (!newPage) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create status page" });
            }

            if (input.monitorIds && input.monitorIds.length > 0) {
                await db.insert(statusPageMonitor).values(
                    input.monitorIds.map((monitorId) => ({
                        statusPageId: newPage.id,
                        monitorId,
                    }))
                );
            }

            return newPage;
        }),

    update: protectedProcedure
        .input(updateStatusPageSchema)
        .mutation(async ({ ctx, input }) => {
            // Check ownership and existence
            const existing = await db.query.statusPage.findFirst({
                where: (table, { eq, and }) => and(eq(table.id, input.id), eq(table.userId, ctx.user.id)),
            });

            if (!existing) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Status page not found" });
            }

            // Check slug uniqueness if changed
            if (existing.slug !== input.slug) {
                const slugConflict = await db.query.statusPage.findFirst({
                    where: (table, { eq }) => eq(table.slug, input.slug),
                });
                if (slugConflict) {
                    throw new TRPCError({ code: "CONFLICT", message: "Slug already exists" });
                }
            }

            await db.update(statusPage)
                .set({
                    title: input.title,
                    slug: input.slug,
                    description: input.description,
                })
                .where(eq(statusPage.id, input.id));

            // Update monitors
            // First delete existing
            await db.delete(statusPageMonitor).where(eq(statusPageMonitor.statusPageId, input.id));

            // Then insert new ones
            if (input.monitorIds && input.monitorIds.length > 0) {
                await db.insert(statusPageMonitor).values(
                    input.monitorIds.map((monitorId) => ({
                        statusPageId: input.id,
                        monitorId,
                    }))
                );
            }

            return { success: true };
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            // Check ownership
            const existing = await db.query.statusPage.findFirst({
                where: (table, { eq, and }) => and(eq(table.id, input.id), eq(table.userId, ctx.user.id)),
            });

            if (!existing) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Status page not found" });
            }

            await db.delete(statusPage).where(eq(statusPage.id, input.id));
            return { success: true };
        }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
        const pages = await db.query.statusPage.findMany({
            where: eq(statusPage.userId, ctx.user.id),
            orderBy: (statusPage, { desc }) => [desc(statusPage.createdAt)],
            with: {
                monitors: true,
            },
        });
        return pages;
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const page = await db.query.statusPage.findFirst({
                where: (table, { eq, and }) => and(eq(table.id, input.id), eq(table.userId, ctx.user.id)),
                with: {
                    monitors: true,
                },
            });

            if (!page) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Status page not found" });
            }

            return page;
        }),
});
