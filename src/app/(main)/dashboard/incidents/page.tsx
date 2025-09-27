import ErrorFallback from '@/components/global/error-fallback'
import Loader from '@/components/global/loader'
import { auth } from '@/lib/auth'
import { loadSearchParams } from '@/modules/incidents/param'
import IncidentsView from '@/modules/incidents/ui/views/incidents-view'
import { api, HydrateClient } from '@/trpc/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { SearchParams } from 'nuqs'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
interface Props {
    searchParams: Promise<SearchParams>
}

const IncidentsPage = async ({ searchParams }: Props) => {
    const data = await auth.api.getSession({
        headers: await headers()
    })

    if (!data?.session) {
        redirect("/signin")
    }

    const { page, search } = await loadSearchParams(searchParams)
    await api.incident.getAll.prefetch({

    })
    return (
        <HydrateClient>
            <Suspense fallback={<Loader loadingText='Loading incidents...' />}>
                <ErrorBoundary fallback={<ErrorFallback error="Failed to load incidents. Please try again later." />}>
                    <IncidentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrateClient>
    )
}

export default IncidentsPage
