import { db } from "@/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { notificationChannel } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import z from "zod";

export const integrationRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const channels = await db.select().from(notificationChannel).where(eq(notificationChannel.userId, ctx.user.id))
        return channels
    }),
    create: protectedProcedure.input(z.object({
        type: z.enum(["email", "slack", "discord", "webhook"]).optional(),
        value: z.string()
    })).mutation(async ({ ctx, input }) => {
        const [channel] = await db.insert(notificationChannel).values({
            userId: ctx.user.id,
            type: input.type as any,
            value: input.value,
        }).returning()
        return channel
    }),
    getByType: protectedProcedure.input(z.object({
        type: z.enum(["email", "slack", "discord", "webhook"]),
    })).query(async ({ ctx, input }) => {
        const [channel] = await db.select().from(notificationChannel).where(and(eq(notificationChannel.userId, ctx.user.id), eq(notificationChannel.type, input.type)))
        return channel
    }),
    remove: protectedProcedure.input(z.object({
        id: z.string()
    })).mutation(async ({ ctx, input }) => {
        await db.delete(notificationChannel).where(eq(notificationChannel.id, input.id))
        return true
    }),
    update: protectedProcedure.input(z.object({
        id: z.string(),
        value: z.string()
    })).mutation(async ({ ctx, input }) => {
        await db.update(notificationChannel).set({ value: input.value }).where(eq(notificationChannel.id, input.id))
        return true
    })
})  