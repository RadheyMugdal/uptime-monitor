"use client"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/trpc/react'
import { useParams } from 'next/navigation'
import React from 'react'

const LatencyMatrix = () => {
    const id = useParams().id
    const [checkResults] = api.monitor.getLatencyStatsById.useSuspenseQuery({ id: id as string })

    return (
        <div className=' grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>
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
    )
}

export default LatencyMatrix
