"use client"

import { Area, CartesianGrid, Line, LineChart } from "recharts"

import {
    ChartConfig,
    ChartContainer
} from "@/components/ui/chart"

export const description = "A line chart with dots"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartLineDots() {
    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={chartData}
                width={500}
                height={300}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />

                <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="green"
                    strokeWidth={2}
                    dot={{
                        fill: "green",
                    }}
                    activeDot={{
                        r: 6,
                    }}
                />

            </LineChart>
        </ChartContainer>

    )
}
