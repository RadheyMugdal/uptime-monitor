"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, type ChartConfig } from '@/components/ui/chart'
import { api } from '@/trpc/react'
import React from 'react'
import { Pie, PieChart } from 'recharts'
import { unknown } from 'zod'

const chartConfig = {
    up: { label: "Up", color: "#00c950" },
    down: { label: "Down", color: "red" },
    paused: { label: "Paused", color: "gray" },
    unknown: { label: "Unknown", color: "blue" },
} satisfies ChartConfig

const MonitorsStatusCard = () => {
    const [statusData] = api.monitor.getMonitorsStatus.useSuspenseQuery()
    const l24 = statusData.last24HoursData
    const up = l24?.upMonitors ?? 0
    const down = l24?.downMonitors ?? 0
    const paused = l24?.pausedMonitors ?? 0
    const total = l24?.totalMonitors ?? 0

    // Exclude paused from uptime denominator
    const active = up + down
    const uptimePct = active > 0 ? Math.round((up / total) * 100) : 0

    return (
        <div className="grid md:grid-cols-2  gap-6">
            <Card className="gap-0 max-h-[300px]">
                <CardHeader className="py-0 justify-center">Status Overview</CardHeader>
                <CardContent>
                    <ChartContainer className="w-full max-h-44" config={chartConfig}>
                        <PieChart>
                            <Pie data={statusData.statusData} dataKey="count" nameKey="status" />
                            <ChartLegend content={<ChartLegendContent nameKey="status" />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="gap-0 max-h-[300px]">
                <CardHeader className="py-0 justify-center">Performance Summary</CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-6 py-4">
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <h4>Overall Uptime</h4>
                            <span className="text-xl font-bold text-center">{uptimePct}%</span>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <h4>Affected monitors</h4>
                            <span className="text-xl font-bold text-center">{down}/{total}</span>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <h4>Active monitors</h4>
                            <span className="text-xl font-bold text-center">{up}/{total}</span>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <h4>Paused monitors</h4>
                            <span className="text-xl font-bold text-center">{paused}/{total}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default MonitorsStatusCard
