import { db } from "@/server/db";
import { statusPage, checkResult } from "@/server/db/schema";
import { eq, desc, and, gte } from "drizzle-orm";
import { notFound } from "next/navigation";
import { MonitorCard } from "./components/monitor-card";
import { subHours } from "date-fns";
import { CheckCircle, XCircle, AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function StatusPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const page = await db.query.statusPage.findFirst({
        where: eq(statusPage.slug, slug),
        with: {
            monitors: {
                with: {
                    monitor: true,
                },
            },
        },
    });

    if (!page) {
        notFound();
    }

    // Fetch checks for the last 24 hours for each monitor
    const now = new Date();
    const twentyFourHoursAgo = subHours(now, 24);

    const monitorsWithChecks = await Promise.all(
        page.monitors.map(async (m) => {
            const checks = await db.query.checkResult.findMany({
                where: and(
                    eq(checkResult.monitorId, m.monitor.id),
                    gte(checkResult.createdAt, twentyFourHoursAgo)
                ),
                orderBy: desc(checkResult.createdAt),
            });
            return { ...m.monitor, checks };
        })
    );

    // Calculate overall status
    const hasDown = monitorsWithChecks.some((m) => m.status === "down");
    const hasIssues = monitorsWithChecks.some((m) => m.status === "down" || m.status === "unknown");

    let overallStatus: "operational" | "outage" | "degraded" = "operational";
    if (hasDown) overallStatus = "outage";
    else if (hasIssues) overallStatus = "degraded";

    return (
        <div className="min-h-screen bg-background font-sans antialiased pb-12">
            {/* Top Status Banner */}
            <div className={cn(
                "w-full py-12 px-4 flex flex-col items-center justify-center text-center transition-colors",
                overallStatus === "operational" && "bg-gradient-to-b from-green-500/10 to-background border-b border-green-500/10",
                overallStatus === "outage" && "bg-gradient-to-b from-red-500/10 to-background border-b border-red-500/10",
                overallStatus === "degraded" && "bg-gradient-to-b from-yellow-500/10 to-background border-b border-yellow-500/10",
            )}>
                <div className="container max-w-3xl mx-auto space-y-6">
                    {/* Brand / Title */}
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">{page.title}</h1>
                        {page.description && (
                            <p className="text-lg text-muted-foreground max-w-xl">{page.description}</p>
                        )}
                    </div>

                    {/* Status Indicator */}
                    <div className={cn(
                        "inline-flex items-center gap-3 px-6 py-3 rounded-full border shadow-sm bg-card/50 backdrop-blur-sm",
                        overallStatus === "operational" && "border-green-500/20 text-green-600 dark:text-green-400",
                        overallStatus === "outage" && "border-red-500/20 text-red-600 dark:text-red-400",
                        overallStatus === "degraded" && "border-yellow-500/20 text-yellow-600 dark:text-yellow-400",
                    )}>
                        {overallStatus === "operational" && <CheckCircle className="h-6 w-6" />}
                        {overallStatus === "outage" && <XCircle className="h-6 w-6" />}
                        {overallStatus === "degraded" && <AlertTriangle className="h-6 w-6" />}
                        <span className="text-xl font-semibold">
                            {overallStatus === "operational" && "All Systems Operational"}
                            {overallStatus === "outage" && "Major Outage"}
                            {overallStatus === "degraded" && "Partial Outage"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="container max-w-3xl mx-auto px-4 mt-12 space-y-12">
                {/* Monitors List */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
                        <Activity className="h-5 w-5" />
                        <h2>System Status</h2>
                    </div>
                    <div className="grid gap-4">
                        {monitorsWithChecks.map((monitor) => (
                            <MonitorCard
                                key={monitor.id}
                                monitor={monitor}
                                checks={monitor.checks}
                            />
                        ))}
                    </div>
                </div>

                {/* Incident History (Placeholder) */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-muted-foreground">Past Incidents</h2>
                    <div className="text-center py-12 border border-dashed rounded-lg text-muted-foreground">
                        No incidents reported in the last 90 days.
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground pt-8 border-t">
                    <p>Powered by <span className="font-semibold text-foreground">Uptime Monitor</span></p>
                </div>
            </div>
        </div>
    );
}
