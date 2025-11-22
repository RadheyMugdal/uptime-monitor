import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { api, HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import Loader from "@/components/global/loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/global/error-fallback";
import EditStatusPageView from "@/modules/status-pages/ui/views/edit-status-page-view";

export default async function EditStatusPagePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    void api.statusPage.getById.prefetch({ id });
    void api.monitor.getMonitorsList.prefetch();

    return (
        <HydrateClient>
            <Suspense fallback={<Loader loadingText="Loading status page..." />}>
                <ErrorBoundary fallback={<ErrorFallback error="Failed to load status page. Please try again later." />}>
                    <EditStatusPageView id={id} />
                </ErrorBoundary>
            </Suspense>
        </HydrateClient>
    );
}
