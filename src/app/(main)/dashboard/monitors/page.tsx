import ErrorFallback from "@/components/global/error-fallback";
import Loader from "@/components/global/loader";
import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/monitors/param";
import MonitorsView from "@/modules/monitors/ui/views/monitors-view";
import { api, HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: Props) {
  const data = await auth.api.getSession({
    headers: await headers()
  })

  if (!data?.session) {
    redirect("/signin")
  }

  const { page, search } = await loadSearchParams(searchParams)

  await api.monitor.getAll.prefetch({ page, search })
  await api.monitor.getMonitorsStatus.prefetch()

  return (
    <HydrateClient>
      <Suspense fallback={<Loader loadingText='Loading monitors...' />}>
        <ErrorBoundary fallback={<ErrorFallback error="Failed to load monitors. Please try again later." />}>
          <MonitorsView />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  )
}
