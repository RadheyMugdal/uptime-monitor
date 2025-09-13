"use client";
import { Badge } from "@/components/ui/badge";
import PricingCard from "@/modules/pricing/ui/components/pricing-card";
import { motion } from "framer-motion";
// adjust path


const plans = [
  {
    name: "Free",
    price: "$0",
    recurringInterval: "forever",
    description: "Perfect for personal projects and getting started",
    benefits: [
      "5 monitors",
      "Email notifications only",
      "24 hours history",
      "15 min check frequency",
      "Basic dashboard",
      "Community support",
    ],
    productId: "free",
    isPopular: false,
  },
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
      "Advanced dashboard",
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
      "Advanced dashboard",
      "24/7 priority support",
      "Custom integrations",
      "Advanced analytics",
      "Team collaboration",
      "API access",
      "Custom domains",
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

export default function PricingSection({

}: {

  }) {
  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <Badge className=" bg-green-600/20   my-3  light:text-black backdrop:blur-xl block   mx-auto rounded-full">
          Pricing
        </Badge>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold  mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="lg:text-lg  opacity-75 max-w-3xl mx-auto">
            Choose the plan that fits your monitoring needs. No hidden fees, no
            surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1  lg:grid-cols-3 gap-8 "
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={cardVariants} >
              <PricingCard
                name={plan.name}
                description={plan.description}
                recurringInterval={plan.recurringInterval}
                price={plan.price}
                productId={plan.productId}
                benefits={plan.benefits}
                isCurrentSubscription={false}
                isPopular={plan.isPopular}
                currentPlan={"free"}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
