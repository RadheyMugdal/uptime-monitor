"use client";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Slack, Webhook, Zap, Shield, LucideSlack } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IoIosMail } from "react-icons/io";
import { FaDiscord, FaSlack } from "react-icons/fa";
import { MdOutlineWebhook } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

const integrationsChannels = [
  { title: "Email", icon: <IoIosMail className=" w-full h-full" /> },
  { title: "Slack", icon: <FaSlack className="w-full h-full" /> },
  { title: "Discord", icon: <FaDiscord className="w-full h-full" /> },
  { title: "Webhook", icon: <MdOutlineWebhook className="w-full h-full" /> },
]
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24 px-4 relative overflow-hidden  max-w-7xl mx-auto">
      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center gap-3">
        <Badge className="bg-green-600/20 my-3  backdrop:blur-xl rounded-full  text-sm">
          Integrations
        </Badge>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-4xl font-bold  mb-6">
            Stay Notified, Stay in Control
          </h2>
          <p className="  opacity-75 max-w-3xl mx-auto">
            Get notified instantly through your preferred channels when issues
            occur or are resolved
          </p>
        </motion.div>

        <div className=" flex items-center justify-center">
          <FloatingDock
            items={integrationsChannels}

          />
        </div>
      </div>
    </section>
  );
}
