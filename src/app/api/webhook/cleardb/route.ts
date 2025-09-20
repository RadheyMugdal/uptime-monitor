import { db } from "@/server/db"
import { sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const secret=req.headers.get("x-zapier-secret")
    if(secret!==process.env.ZAPIER_SECRET){
        return new Response("Unauthorized",{status:401})
    }
    try {
        await db.execute(sql`
            DELETE FROM check_result
            USING "user" AS u
            WHERE check_result.user_id = u.id
              AND (
                (u.plan = 'free' AND check_result.created_at < NOW() - INTERVAL '1 day')
                OR
                (u.plan = 'pro'  AND check_result.created_at < NOW() - INTERVAL '30 days')
                OR
                (u.plan = 'business'  AND check_result.created_at < NOW() - INTERVAL '6 months')
              );
        `);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error:"Error Cleaning up DB"},{status:500})
    }    

    return NextResponse.json({message:"Database cleared sucessfully"})
}