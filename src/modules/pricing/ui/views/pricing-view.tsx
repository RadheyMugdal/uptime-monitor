"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { api } from '@/trpc/react'
import { Check } from 'lucide-react'
import React from 'react'
import PricingCard from '../components/pricing-card'

const PricingView = () => {
    const [data] = api.pricing.getPlans.useSuspenseQuery()
    const [currentSubscriptionData] = api.pricing.getCurrentSubscription.useSuspenseQuery()
    const isSubscribed = currentSubscriptionData?.subscription?.status === "active"
    const currentPlan = isSubscribed
        ? (data.items.filter((p) => p.id === currentSubscriptionData?.subscription?.productId)[0] as any).name.toLowerCase() as "pro" | "business"
        : "free"
    return (
        <main className=' py-12 px-16 flex flex-col gap-16'>
            <div className='mx-auto max-w-2xl flex flex-col gap-4'>
                <h1 className='font-semibold text-3xl text-center'>Upgrade your plan</h1>
                <p className='text-sm text-center text-balance'>Monitor your services in real-time and stay ahead of downtime with flexible plans for any project.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full  max-w-screen-lg   mx-auto gap-6 p-4'>
                <PricingCard
                    productId={'Free-plan'}
                    name={"Free"}
                    currentPlan={currentPlan}
                    description={"Best for indie hackers"}
                    recurringInterval={"month"}
                    price={"$0"}
                    benefits={[
                        "5 monitors",
                        "Email integration",
                        "24 hours history",
                        "min 15 min check interval"
                    ]}
                    isPopular={false}
                    isCurrentSubscription={!isSubscribed}

                />
                {
                    data.items.map((plan) => {
                        const price = plan.prices.find((p) => p.type === "recurring") as any
                        const benefits = plan.benefits.map((b) => b.description)
                        const isPopular = plan.metadata.isPopular === "true"
                        const amount = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: price.priceCurrency,
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(price.priceAmount / 100)
                        const isCurrentSubscription = currentSubscriptionData?.subscription?.productId === plan.id
                        return (
                            <PricingCard
                                key={plan.id}
                                currentPlan={currentPlan}
                                isCurrentSubscription={isCurrentSubscription}
                                productId={plan.id}
                                name={plan.name}
                                description={plan.description as string}
                                recurringInterval={price?.recurringInterval ?? "month"}
                                price={amount}
                                benefits={benefits}
                                isPopular={isPopular}

                            />
                        )
                    }
                    )
                }
            </div>
        </main>
    )
}

export default PricingView
