"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import PricingCard from "./pricing-card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
// adjust path

const plans = [
  // {
  //   name: "Free",
  //   price: "$0",
  //   recurringInterval: "forever",
  //   description: "Perfect for personal projects and getting started",
  //   benefits: [
  //     "5 monitors",
  //     "Email notifications only",
  //     "24 hours history",
  //     "15 min check frequency",
  //     "Basic dashboard",
  //     "Community support",
  //   ],
  //   productId: "free",
  //   isPopular: false,
  // },
  {
    name: "Pro",
    price: "$12",
    recurringInterval: "month",
    description: "Ideal for growing businesses and professional use",
    benefits: [
      "30 monitors",
      "All notification channels",
      "30 days history",
      "10 min check frequency",

      "Priority support",
      "Custom integrations",
      "Detailed analytics",
    ],
    productId: "pro",
    isPopular: true,
  },
  {
    name: "Business",
    price: "$39",
    recurringInterval: "month",
    description: "For teams and organizations with high monitoring needs",
    benefits: [
      "100 monitors",
      "All notification channels",
      "6 months history",
      "5 min check frequency",

      "24/7 priority support",
      "Custom integrations",
      "Advanced analytics",


    ],
    productId: "business",
    isPopular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function PricingSection({ }: {}) {
  return (
    <section id="pricing" className="py-16 px-4 md:py-32 md:px-8 relative overflow-hidden space-y-18 mx-auto max-w-7xl">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-medium text-balance text-center"
      >
        Pricing
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 w-full gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={cardVariants}
          className="h-auto md:h-full min-h-[300px] md:min-h-[500px] gap-8 flex flex-col p-8 justify-center text-center md:text-left"
        >
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-medium text-balance">Ready to get started?</h1>
            <p>Start monitoring your services today. No credit card required for the free plan. Upgrade anytime as you grow.</p>
          </div>
          <div>
            <Button className="  w-full md:w-auto" variant={"secondary"}>
              Get Started for free
            </Button>
          </div>
        </motion.div>
        {
          plans.map((plan) => (
            <motion.div key={plan.name} variants={cardVariants} className="h-full">
              <Card className="rounded-none h-full">
                <CardHeader className="space-y-4">
                  <CardTitle className="!font-medium text-3xl">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-baseline">
                    <p className="text-6xl">
                      {plan.price}
                    </p>
                    <p>
                      /{plan.recurringInterval}
                    </p>
                  </div>
                  <CardDescription>
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <div className="flex flex-col justify-between h-full gap-8">
                  <CardContent>
                    <div className="space-y-2">
                      {plan.benefits.map((benefit) => (
                        <div key={benefit} className="flex gap-2 items-center">
                          <CheckCircle2 className="size-4" />
                          <p className="opacity-75">{benefit}</p>
                        </div>
                      ))}

                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))
        }
      </motion.div>
    </section>
  );
}
