import { db } from "@/server/db";
import { inngest } from "./client";
import { eq } from "drizzle-orm";
import axios from 'axios'   
import { checkResult, monitor } from "@/server/db/schema";

export const checkMonitorFiveMinutes = inngest.createFunction(
    { id: "check-monitor-5-minutes" },
    { cron: "*/5 * * * *" },
    async ({ event, step,logger }) => {
        const monitorId  = event.data.monitorId

        const existingMonitor=await step.run("check monitor exists",async ()=>{
            const [existingMonitor] = await db.select().from(monitor).where(eq(monitor.id, monitorId))
            if(!existingMonitor){
                throw new Error("Monitor not found")
            }
            return existingMonitor
        })

        let status: number = 0
        let responseMs: number = 0
        let isUp: boolean = false
        await step.run("check monitor status",async ()=>{
             try {
            const start = Date.now()
            const res = await axios.request({
                url: existingMonitor.url,
                method: existingMonitor.method,
                headers: existingMonitor.headers as any,
                timeout: 8000
            })
            responseMs = Date.now() - start
            logger.info(`Response time: ${responseMs}ms`)
            status = res.status
            isUp = status === existingMonitor.expectedStatus

        } catch (error) {
            status = 0
            isUp = false
        }
        return
        })
        await step.run("update monitor status",async ()=>{
            await db.update(monitor).set({
                status: isUp ? "up" : "down",
            }).where(eq(monitor.id, monitorId))
            await db.insert(checkResult).values({
                monitorId,
                status: isUp ? "up" : "down",
                responseMs,
            })
            return
        })
       

    },
);

export const checkMonitorTenMinutes = inngest.createFunction(
    { id: "check-monitor-10-minutes" },
    { cron: "*/10 * * * *" },
    async ({ event, step,logger }) => {
        const { monitorId } = event.data
        const [existingMonitor] = await db.select().from(monitor).where(eq(monitor.id, monitorId))
        if (!existingMonitor) return

        let status: number = 0
        let responseMs: number = 0
        let isUp: boolean = false

        try {
            const start = Date.now()
            const res = await axios.request({
                url: existingMonitor.url,
                method: existingMonitor.method,
                headers: existingMonitor.headers as any,
                timeout: 8000
            })
            responseMs = Date.now() - start
            console.log(responseMs)
            logger.info(responseMs)
            status = res.status
            isUp = status === existingMonitor.expectedStatus

        } catch (error) {
            status = 0
            isUp = false
        }
        await db.update(monitor).set({
            status: isUp ? "up" : "down",
        }).where(eq(monitor.id, monitorId))
        await db.insert(checkResult).values({
            monitorId,
            status: isUp ? "up" : "down",
            responseMs,
        })

    },
);