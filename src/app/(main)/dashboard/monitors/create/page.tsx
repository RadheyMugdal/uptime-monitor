
import ErrorFallback from "@/components/global/error-fallback";
import Loader from "@/components/global/loader";
import CreateMonitorView from "@/modules/monitors/ui/views/create-monitor-view";
import { api, HydrateClient } from "@/trpc/server";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

;
const CreateMonitorPage = async () => {
  await api.pricing.getCurrentSubscription.prefetch()

  return (
    <HydrateClient>
      <Suspense fallback={<Loader loadingText='Getting things ready to create your monitor...' />}>
        <ErrorBoundary fallback={<ErrorFallback error="Unable to load monitor creation tools. Refresh the page and try again." />}>
          <CreateMonitorView />
        </ErrorBoundary>
      </Suspense>

    </HydrateClient>
  )
}

export default CreateMonitorPage
