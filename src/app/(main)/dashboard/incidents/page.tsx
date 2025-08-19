import { auth } from '@/lib/auth'
import { loadSearchParams } from '@/modules/incidents/param'
import IncidentsView from '@/modules/incidents/ui/views/incidents-view'
import { api, HydrateClient } from '@/trpc/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { SearchParams } from 'nuqs'
import React, { Suspense } from 'react'
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
            <Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary fallback={<div>Error</div>}>
                    <IncidentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrateClient>
    )
}

export default IncidentsPage
