import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { authClient } from '@/lib/authClient'
import { Check } from 'lucide-react'
import React from 'react'
import { getPlanButtonState } from '../../util'
interface Props {
    name: string
    description: string
    recurringInterval: string
    price: string
    productId: string
    benefits: string[]
    isCurrentSubscription: boolean
    isPopular: boolean
    currentPlan: "free" | "pro" | "business"
}

const PricingCard: React.FC<Props> = ({
    name,
    description,
    recurringInterval,
    price,
    productId,
    benefits,
    isCurrentSubscription,
    isPopular,
    currentPlan,
}) => {
    const cardPlan = name.toLowerCase() as "free" | "pro" | "business"
    const { label, action } = getPlanButtonState(currentPlan, cardPlan)

    const handleClick = async () => {
        if (action === "portal") {
            return authClient.customer.portal()
        }
        if (action === "upgrade") {
            return authClient.checkout({ products: [productId] })
        }
    }

    return (
        <Card className="relative h-full">
            {isPopular && (
                <Badge className="absolute right-4 top-4 bg-green-600/20   light:text-black backdrop:blur-3xl">
                    🔥Popular</Badge>
            )}
            <CardHeader>
                <CardTitle className="text-2xl">{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardTitle className="text-4xl mt-4">
                    {price}{" "}
                    <span className="text-sm font-normal">/ {recurringInterval}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                {action !== "none" && (
                    <Button className="w-full" onClick={handleClick} variant={name !== "Free" ? "default" : "secondary"}>
                        {label}
                    </Button>
                )}
                <Separator className="w-full" />
                <div className="flex flex-col gap-2">
                    <h4 className="text-sm">What's included</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                        {benefits.map((benefit) => (
                            <li className="flex items-center gap-2" key={benefit}>
                                <Check className="size-4" />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}


export default PricingCard