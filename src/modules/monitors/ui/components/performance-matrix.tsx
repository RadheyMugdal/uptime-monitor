"use client"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/trpc/react'
import { formatDistanceToNow } from 'date-fns'
import { useParams } from 'next/navigation'
import React from 'react'

const PerformanceMatrix = () => {
    const id = useParams().id
    const [performance] = api.monitor.getMonitorPerformance.useSuspenseQuery({ id: id as string })
    return (
        <div className=' grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>
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
    )
}

export default PerformanceMatrix
