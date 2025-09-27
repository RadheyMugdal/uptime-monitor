import ErrorFallback from '@/components/global/error-fallback';
import Loader from '@/components/global/loader';
import PricingView from '@/modules/pricing/ui/views/pricing-view';
import { api, HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const page = async () => {
    await api.pricing.getPlans.prefetch()
    await api.pricing.getCurrentSubscription.prefetch()
    return (
        <HydrateClient>
            <Suspense fallback={<Loader loadingText='Loading pricing...' />}>
                <ErrorBoundary fallback={<ErrorFallback error="Failed to load pricing. Please try again later." />}>
                    <PricingView />
                </ErrorBoundary>
            </Suspense>
        </HydrateClient>
    )
}

export default page
export const dynamic = "force-dynamic"