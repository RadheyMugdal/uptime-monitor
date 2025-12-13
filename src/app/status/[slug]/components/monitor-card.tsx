"use client";

import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, XCircle, AlertCircle, PauseCircle, History } from "lucide-react";
import { format, subMinutes, isWithinInterval } from "date-fns";
import { cn } from "@/lib/utils";

interface CheckResult {
    id: string;
    status: "up" | "down" | "paused" | "unknown";
    createdAt: Date;
    responseMs: number;
}

interface Monitor {
    id: string;
    name: string;
    status: "up" | "down" | "paused" | "unknown";
    frequencyMinutes: number;
}

interface MonitorCardProps {
    monitor: Monitor;
    checks: CheckResult[];
}

export function MonitorCard({ monitor, checks }: MonitorCardProps) {
    // Generate 48 bars for the last 24 hours (30 mins each)
    const bars = Array.from({ length: 48 }).map((_, i) => {
        const index = 47 - i; // 47 is newest, 0 is oldest
        const now = new Date();
        const end = subMinutes(now, index * 30);
        const start = subMinutes(end, 30);

        const checksInSlice = checks.filter((c) =>
            isWithinInterval(new Date(c.createdAt), { start, end })
        );

        let status: "up" | "down" | "empty" | "paused" = "empty";
        let label = "No data";

        if (checksInSlice.length > 0) {
            const hasDown = checksInSlice.some((c) => c.status === "down");
            const isPaused = checksInSlice.every((c) => c.status === "paused");

            if (hasDown) {
                status = "down";
                label = "Downtime recorded";
            } else if (isPaused) {
                status = "paused";
                label = "Paused";
            } else {
                status = "up";
                label = "Operational";
            }
        }

        return {
            start,
            end,
            status,
            label,
            avgResponseTime: checksInSlice.length > 0
                ? Math.round(checksInSlice.reduce((acc, c) => acc + c.responseMs, 0) / checksInSlice.length)
                : null
        };
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "up": return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "down": return <XCircle className="h-5 w-5 text-red-500" />;
            case "paused": return <PauseCircle className="h-5 w-5 text-yellow-500" />;
            default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "up": return "Operational";
            case "down": return "Downtime";
            case "paused": return "Paused";
            default: return "Unknown";
        }
    };

    return (
        <Card className="overflow-hidden border-border/40 shadow-sm">
            <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="font-semibold text-lg">{monitor.name}</div>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full">
                        {getStatusIcon(monitor.status)}
                        <span className={cn("text-sm font-medium",
                            monitor.status === "up" && "text-green-600 dark:text-green-400",
                            monitor.status === "down" && "text-red-600 dark:text-red-400",
                            monitor.status === "paused" && "text-yellow-600 dark:text-yellow-400",
                            monitor.status === "unknown" && "text-gray-600 dark:text-gray-400",
                        )}>
                            {getStatusText(monitor.status)}
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-end justify-between text-xs text-muted-foreground px-1">
                        <span>24 hours ago</span>
                        <div className="h-[1px] flex-1 mx-4 bg-border/50 self-center" />
                        <span>Today</span>
                    </div>

                    <TooltipProvider delayDuration={0}>
                        <div className="flex gap-[3px] h-12 items-end">
                            {bars.map((bar, i) => (
                                <Tooltip key={i}>
                                    <TooltipTrigger asChild>
                                        <div
                                            className={cn(
                                                "flex-1 rounded-sm transition-all hover:opacity-80 hover:scale-y-110 origin-bottom cursor-pointer",
                                                bar.status === "up" && "bg-green-500 h-8",
                                                bar.status === "down" && "bg-red-500 h-full",
                                                bar.status === "paused" && "bg-yellow-500 h-6",
                                                bar.status === "empty" && "bg-secondary h-4"
                                            )}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs p-2">
                                        <div className="font-semibold mb-1">{format(bar.start, "MMM d, HH:mm")} - {format(bar.end, "HH:mm")}</div>
                                        <div className={cn(
                                            "font-medium",
                                            bar.status === "up" && "text-green-500",
                                            bar.status === "down" && "text-red-500",
                                            bar.status === "paused" && "text-yellow-500",
                                        )}>
                                            {bar.label}
                                        </div>
                                        {bar.avgResponseTime && (
                                            <div className="text-muted-foreground mt-1">
                                                Avg: {bar.avgResponseTime}ms
                                            </div>
                                        )}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </TooltipProvider>
                </div>
            </div>
        </Card>
    );
}
