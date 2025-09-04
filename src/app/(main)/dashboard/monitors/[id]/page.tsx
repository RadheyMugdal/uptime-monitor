import MonitorView from '@/modules/monitors/ui/views/monitor-view'
import { api, HydrateClient } from '@/trpc/server'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await api.monitor.getMonitorById.prefetch({ id })
  await api.monitor.getLatencyStatsById.prefetch({ id })
  await api.monitor.getMonitorPerformance.prefetch({ id })
  await api.monitor.getLastFiveIncidents.prefetch({ id })

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Error</div>}>
          <MonitorView />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  )
}
