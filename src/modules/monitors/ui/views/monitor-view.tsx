"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

const chartConfig = {
    responseMs: {
        label: "Response time (ms)",
        color: "var(--chart-1)"
    }
} satisfies ChartConfig
const MonitorView = () => {
    const id = useParams().id
    const [data] = api.monitor.getMonitorById.useSuspenseQuery({ id: id as string })
    const [checkResults] = api.monitor.getLatencyStatsById.useSuspenseQuery({ id: id as string })
    const [performance] = api.monitor.getMonitorPerformance.useSuspenseQuery({ id: id as string })
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
                <div className='flex gap-4 items-center'>
                    <div className='size-10  bg-green-500 rounded-full relative'>
                        <div className='  absolute inset-1 animate-ping bg-green-500 rounded-full'>
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
                <div className=' grid gap-6 grid-cols-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total incidents</CardTitle>
                            <CardDescription>Incidents for the last 24 hours</CardDescription>
                            <CardTitle>{performance.incidentsCount}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Currently up for</CardTitle>
                            <CardDescription> Date from last incidence</CardDescription>
                            <CardTitle>
                                {performance.lastIncident?.createdAt
                                    ? formatDistanceToNow(new Date(performance.lastIncident.createdAt), { addSuffix: true })
                                    : "No incidents yet"}
                            </CardTitle>

                        </CardHeader>
                    </Card>


                </div>

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
                <div className=' grid gap-6 grid-cols-4'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Response time</CardTitle>
                            <CardDescription> {Math.ceil(checkResults.averageResponseTime || 0)} Ms</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Maximum Response time</CardTitle>
                            <CardDescription> {checkResults.maxResponseTime} Ms</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Minimum Response time</CardTitle>
                            <CardDescription> {checkResults.minResponseTime} Ms</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Last Response time</CardTitle>
                            <CardDescription> {checkResults.lastCheckResultResponseTime} Ms</CardDescription>
                        </CardHeader>
                    </Card>

                </div>

            </div>
        </>
    )
}

export default MonitorView
