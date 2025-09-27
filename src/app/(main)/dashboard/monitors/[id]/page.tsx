import ErrorFallback from '@/components/global/error-fallback';
import Loader from '@/components/global/loader';
import MonitorView from '@/modules/monitors/ui/views/monitor-view';
import { api, HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await api.monitor.getMonitorById.prefetch({ id })
  await api.monitor.getLatencyStatsById.prefetch({ id })
  await api.monitor.getMonitorPerformance.prefetch({ id })
  await api.monitor.getLastFiveIncidents.prefetch({ id })

  return (
    <HydrateClient>
      <Suspense fallback={<Loader loadingText='Loading monitor...' />}>
        <ErrorBoundary fallback={<ErrorFallback error="Failed to load monitor. Please try again later." />}>
          <MonitorView />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  )
}
