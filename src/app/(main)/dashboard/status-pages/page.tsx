import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { api, HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import Loader from "@/components/global/loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/global/error-fallback";
import StatusPagesView from "@/modules/status-pages/ui/views/status-pages-view";

export default async function StatusPagesPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    await api.statusPage.getAll.prefetch();

    return (
        <HydrateClient>
            <Suspense fallback={<Loader loadingText="Loading status pages..." />}>
                <ErrorBoundary fallback={<ErrorFallback error="Failed to load status pages. Please try again later." />}>
                    <StatusPagesView />
                </ErrorBoundary>
            </Suspense>
        </HydrateClient>
    );
}
