import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/authClient";
import { Check } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { getPlanButtonState } from "@/modules/pricing/util";
interface Props {
    name: string;
    description: string;
    recurringInterval: string;
    price: string;
    productId: string;
    benefits: string[];
    isCurrentSubscription: boolean;
    isPopular: boolean;
    currentPlan: "free" | "pro" | "business";
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
    const cardPlan = name.toLowerCase() as "free" | "pro" | "business";

    const handleClick = async () => {
        if (cardPlan === "free") return;

        const { data } = await authClient.getSession()
        if (!data?.session) {
            return window.location.href = `/signin?redirect=/pricing`;
        }
        return authClient.checkout({ products: [productId] });
    };

    return (
        <motion.div transition={{ duration: 0.3 }} className="h-full w-full ">
            <Card className="relative h-full">
                {isPopular && (
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                    >
                        <Badge className="absolute right-4 top-4 bg-green-600/20   light:text-black backdrop:blur-3xl">
                            🔥Popular
                        </Badge>
                    </motion.div>
                )}
                <CardHeader>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <CardTitle className="text-2xl">{name}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <CardTitle className="text-4xl mt-4">
                                {price}{" "}
                                <span className="text-sm font-normal">
                                    / {recurringInterval}
                                </span>
                            </CardTitle>
                        </motion.div>
                    </motion.div>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Button
                            className="w-full"
                            onClick={handleClick}
                            variant={name !== "Free" ? "default" : "secondary"}
                        >
                            {
                                cardPlan === "free" ? "Get started for free"
                                    : `Get ${cardPlan}`
                            }
                        </Button>
                    </motion.div>

                    <Separator className="w-full" />
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="text-sm">What's included</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                            {benefits.map((benefit, index) => (
                                <li className="flex items-center gap-2" key={benefit}>
                                    <div>
                                        <Check className="size-4" />
                                    </div>
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default PricingCard;
