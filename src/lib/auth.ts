import { db } from "@/server/db";
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import * as schema from "@/server/db/schema"
import { polarClient } from "./polar";

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