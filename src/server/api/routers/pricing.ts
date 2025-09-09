
import { createTRPCRouter, publicProcedure } from "../trpc";
import { polarClient } from "@/lib/polar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const pricingRouter = createTRPCRouter({
    getPlans: publicProcedure.query(async ({ ctx }) => {
        const products = await polarClient.products.list({
            isArchived: false,
            isRecurring: true,
            sorting: ["price_amount"]
        })
        return products.result
    }),
    getCurrentSubscription: publicProcedure.query(async ({ ctx }) => {
        try {
            const data = await auth.api.getSession({ headers: ctx.headers });
            if (data?.user) {
                const customerState = await auth.api.state({
                    headers: ctx.headers
                });
                const planName = await polarClient.products.get({ id: customerState?.activeSubscriptions?.[0]?.productId as string })
                return {
                    subscription: customerState?.activeSubscriptions?.[0] ?? null,
                    planName: planName?.name.toLowerCase() as "pro" | "business" || "free"
                };
            }
            return null;
        } catch (err) {
            console.error("getCurrentSubscription error:", err);
            return null;
        }
    })
})
