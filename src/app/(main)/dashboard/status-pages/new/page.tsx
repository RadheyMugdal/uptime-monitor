import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { api, HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import Loader from "@/components/global/loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/global/error-fallback";
import NewStatusPageView from "@/modules/status-pages/ui/views/new-status-page-view";

export default async function NewStatusPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    await api.monitor.getMonitorsList.prefetch();

    return (
        <HydrateClient>
            <Suspense fallback={<Loader loadingText="Loading..." />}>
                <ErrorBoundary fallback={<ErrorFallback error="Failed to load data. Please try again later." />}>
                    <NewStatusPageView />
                </ErrorBoundary>
            </Suspense>
        </HydrateClient>
    );
}
