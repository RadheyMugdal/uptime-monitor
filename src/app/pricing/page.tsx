import PricingView from '@/modules/pricing/ui/views/pricing-view'
import { api, HydrateClient } from '@/trpc/server'
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary'

const page = async () => {
    await api.pricing.getPlans.prefetch()
    await api.pricing.getCurrentSubscription.prefetch()
    return (
        <HydrateClient>
            <Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary fallback={<div>Error</div>}>
                    <PricingView />
                </ErrorBoundary>
            </Suspense>
        </HydrateClient>
    )
}

export default page
