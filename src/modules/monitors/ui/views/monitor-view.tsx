"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { match } from 'ts-pattern';
import { SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import Link from 'next/link'
import { useParams } from 'next/navigation';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import PerformanceMatrix from '../components/performance-matrix'
import LatencyMatrix from '../components/latency-matrix'
import RecentIncident from '../components/recent-incidents'
import { Button } from '@/components/ui/button';
import { Cog, Monitor, Pause, Play, RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import MonitorSettingForm from '../components/monitor-setting-form';

const chartConfig = {
    responseMs: {
        label: "Response time (ms)",
        color: "var(--chart-1)"
    }
} satisfies ChartConfig
const MonitorView = () => {
    const id = useParams().id
    const [data] = api.monitor.getMonitorById.useSuspenseQuery({ id: id as string })
    const utils = api.useUtils()
    const [checkResults] = api.monitor.getLatencyStatsById.useSuspenseQuery({ id: id as string })
    const pauseMonitor = api.monitor.pauseMonitor.useMutation()
    const resumeMonitor = api.monitor.resumeMonitor.useMutation()
    const [currentTab, setCurrentTab] = useState<"performance" | "setting">("performance")

    const tabsContent = match(currentTab).with("performance", () => (
        <>
            <PerformanceMatrix />
            <Card className=' max-h-[500px]'>
                <CardHeader>
                    <CardTitle>Response time</CardTitle>
                    <CardDescription>Average response time for the last 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer className=' max-h-[400px] w-full' config={chartConfig}>
                        <LineChart data={checkResults.checkResults} >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="createdAt"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={0}
                                tickFormatter={(unixtime) => (
                                    new Date(unixtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                )}
                            />
                            <YAxis
                                dataKey="responseMs"
                                tickLine={false}
                                domain={['dataMin - 100', 'dataMax + 100']}
                                tickCount={6}
                                axisLine={false}
                                tickMargin={8}
                                label={{
                                    value: "Response Time (ms)",
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { textAnchor: 'middle' }
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey="responseMs"
                                type="natural"
                                stroke="green"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <LatencyMatrix />
            <RecentIncident />
        </>
    ))
        .with("setting", () => (
            <>
                <MonitorSettingForm monitor={data.monitor!} />
            </>
        )).exhaustive()

    const handlePauseMonitor = async () => {
        try {
            await pauseMonitor.mutateAsync({ id: id as string })
            utils.monitor.getMonitorById.setData({ id: id as string }, (oldData) => {
                if (!oldData) return oldData
                return {
                    ...oldData,
                    monitor: { ...oldData.monitor!, status: "paused" },
                }
            })
            toast.success("Monitor paused successfully")
        } catch (err: any) {
            toast.error(err.message ?? "Failed to pause monitor")
        }
    }

    const handleResumeMonitor = async () => {
        try {
            await resumeMonitor.mutateAsync({ id: id as string })
            utils.monitor.getMonitorById.setData({ id: id as string }, (oldData) => {
                if (!oldData) return oldData
                return {
                    ...oldData,
                    monitor: { ...oldData.monitor!, status: "unknown" },
                }
            })
            toast.success("Monitor resumed successfully")
        } catch (err: any) {
            toast.error(err.message ?? "Failed to resume monitor")
        }
    }


    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href={`/dashboard/monitors`}>
                                    Monitors
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href={`/dashboard/monitors`}>
                                    {data.monitor?.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex  flex-1 flex-col gap-4 p-4 pt-0">
                <div className='flex items-center  justify-between'>
                    <div className='flex gap-4 items-center'>
                        <div className={cn('size-10  rounded-full relative',
                            data.monitor?.status === 'up' && 'bg-green-500',
                            data.monitor?.status === 'down' && 'bg-red-500',
                            data.monitor?.status === 'paused' && 'bg-yellow-500',
                            data.monitor?.status === "unknown" && 'bg-gray-500'
                        )}>
                            <div className={cn('  absolute inset-1 animate-ping rounded-full',
                                data.monitor?.status === 'up' && 'bg-green-500',
                                data.monitor?.status === 'down' && 'bg-red-500',
                                data.monitor?.status === 'paused' && 'bg-yellow-500',
                                data.monitor?.status === "unknown" && 'bg-gray-500',
                            )}>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-xl font-semibold'>{data.monitor?.name}</h1>
                            <span className=' text-sm'>
                                Monitor for {" "}
                                <Link href={data.monitor?.url!} className={cn(" hover:underline",
                                    data.monitor?.status === 'up' && 'text-green-500',
                                    data.monitor?.status === 'down' && 'text-red-500',
                                )}>
                                    {data.monitor?.url}
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {
                                    currentTab === "setting" ? (
                                        <Button variant={"ghost"} size={"icon"} onClick={() => setCurrentTab("performance")}>
                                            <Monitor className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button variant={"ghost"} size={"icon"} onClick={() => setCurrentTab("setting")}>
                                            <Cog className="w-4 h-4" />
                                        </Button>
                                    )
                                }
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                {
                                    currentTab === "setting" ? "Performance View" : "Monitor Settings"
                                }
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"ghost"} size={"icon"}
                                    onClick={() => {
                                        data.monitor?.status === "paused" ? handleResumeMonitor() : handlePauseMonitor()
                                    }}
                                    disabled={pauseMonitor.isPending || resumeMonitor.isPending}
                                >
                                    {
                                        data.monitor?.status === "paused" ? <Play /> : <Pause />
                                    }
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                {
                                    data.monitor?.status === "paused" ? "Resume Monitor" : "Pause Monitor"
                                }
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                {tabsContent}
            </div>
        </>
    )
}

export default MonitorView
