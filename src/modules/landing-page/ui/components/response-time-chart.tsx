"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const generateData = () =>
    Array.from({ length: 20 }, (_, i) => ({
        time: i,
        latency: Math.floor(Math.random() * 200) + 50,
    }))

export function ResponseTimeCard() {
    const [data, setData] = useState(generateData())

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev: any) => [
                ...prev.slice(1),
                {
                    time: prev[prev.length - 1].time + 1,
                    latency: Math.floor(Math.random() * 200) + 50,
                },
            ])
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-[360px] h-[260px] rounded-2xl bg-black/70 border border-white/10 shadow-xl p-4 flex flex-col justify-between">
            {/* Title */}
            <div className="text-sm text-white/70 font-medium">Response Time (ms)</div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Line
                        type="monotone"
                        dataKey="latency"
                        stroke="url(#colorLatency)"
                        strokeWidth={3}
                        dot={false}
                    />
                    <defs>
                        <linearGradient id="colorLatency" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                    </defs>
                </LineChart>
            </ResponsiveContainer>

            {/* Metrics Footer */}
            <div className="flex justify-between text-xs text-white/80 mt-2">
                <span>Avg: 125ms</span>
                <span>Uptime: 99.99%</span>
                <span>Incidents: 0</span>
            </div>
        </div>
    )
}
