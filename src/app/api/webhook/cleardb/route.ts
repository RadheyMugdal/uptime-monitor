import { db } from "@/server/db"
import { checkResult } from "@/server/db/schema"
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
            USING "user"
            WHERE check_result.user_id = user.id
              AND (
                (user.plan = 'free' AND check_result.created_at < NOW() - INTERVAL '1 day')
                OR
                (user.plan = 'pro'  AND check_result.created_at < NOW() - INTERVAL '30 days')
                OR
                (user.plan = 'business'  AND check_result.created_at < NOW() - INTERVAL '6 months')
              );
          `);
    } catch (error) {
        return NextResponse.json({error:"Error Cleaning up DB"},{status:500})
    }

    return NextResponse.json({message:"Database cleared sucessfully"})
}