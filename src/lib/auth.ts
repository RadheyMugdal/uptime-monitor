import { db } from "@/server/db";
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import * as schema from "@/server/db/schema"
import { polarClient } from "./polar";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    authenticatedUsersOnly: true
                }),
                portal(),
                webhooks(
                    {
                        secret:process.env.POLAR_WEBHOOK_SECRET!,
                        async onSubscriptionCreated(payload) {
                            const plan=payload.data.product.name.toLowerCase() as "pro" |"business" || "free"
                            const expiresAt=payload.data.endsAt
                            await db.update(schema.user).set({
                                plan,
                                subscriptionExpiresAt:expiresAt
                            }).where(eq(schema.user.id,payload.data.customer.externalId!))
                        },
                        async onSubscriptionUpdated(payload) {
                            const plan=payload.data.product.name.toLowerCase() as "pro" |"business" || "free"
                            const expiresAt=payload.data.endsAt
                            await db.update(schema.user).set({
                                plan,
                                subscriptionExpiresAt:expiresAt
                            }).where(eq(schema.user.id,payload.data.customer.externalId!))
                            return;
                        },
                        async onSubscriptionCanceled(payload) {
                            await db.update(schema.user).set({
                                plan:"free",
                                subscriptionExpiresAt:null
                            }).where(eq(schema.user.id,payload.data.customer.externalId!))
                            return;
                        },
                    }
                )
            ]
        }),
    ],
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    databaseHooks: {
        user: {
            create: {
                async after(user, context) {
                    const channel = await db.insert(schema.notificationChannel).values({
                        userId: user.id,
                        type: "email",
                        value: user.email,
                    }).returning()
                },
            }
        }
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }

    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,

})