
import CreateMonitorView from "@/modules/monitors/ui/views/create-monitor-view";
import { api, HydrateClient } from "@/trpc/server";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

;
const CreateMonitorPage = async () => {
  await api.pricing.getCurrentSubscription.prefetch()

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Error</div>}>
          <CreateMonitorView />
        </ErrorBoundary>
      </Suspense>

    </HydrateClient>
  )
}

export default CreateMonitorPage
