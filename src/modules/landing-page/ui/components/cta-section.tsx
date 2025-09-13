"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-12 mb-12 px-4 mx-auto w-[80%] rounded-2xl relative overflow-hidden  max-w-7xl ">
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59,130,246,0.08) 10px, rgba(59,130,246,0.08) 20px)",
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center "
        >
          <h2 className="text-4xl md:text-5xl font-bold  mb-6">
            Every Second of Downtime Costs You
          </h2>
          <p className="  lg:text-lg   opacity-75 max-w-4xl mx-auto mb-12">
            Don&apos;t lose customers or revenue. Monitor your websites and APIs in real-time and react instantly with our automated alerts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className=" group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
            >
              See Plans
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
