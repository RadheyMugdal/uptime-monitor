"use client";
import { motion, type Variant } from "framer-motion";
import { PiTimerBold } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { MdOutlineAutoGraph } from "react-icons/md";
import { AiOutlineNotification } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.5,
    ease: "easeOut",
  },
};

export default function FeaturesSection() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Badge className=" bg-green-600/20   my-3  light:text-black backdrop:blur-xl  rounded-full">
            Features
          </Badge>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Never Miss a Critical Moment
        </motion.h2>
        <motion.p
          className="lg:text-lg opacity-75 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Comprehensive uptime monitoring with enterprise-grade features to keep
          your digital infrastructure running at peak performance
        </motion.p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Feature 1 */}
        <motion.div
          className="border md:col-span-2 rounded-2xl bg-secondary/20 before:size-52 before:-right-20 before:-top-[30%] before:rounded-full before:bg-primary before:absolute before:-z-10 before:content-[''] before:blur-2xl overflow-hidden relative backdrop:blur-lg"
          variants={itemVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="p-12 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <MdOutlineAutoGraph className="size-10 bg-accent p-2 rounded-md" />
                <h3 className="text-3xl font-bold">Lightning-Fast Detection</h3>
              </div>
              <p className="opacity-75 text-pretty">
                Monitor your HTTP services, APIs, and websites with
                sub-30-second detection. Get instant alerts from our global
                network the moment something goes wrong.
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <MdDashboard />
                Real-time performance dashboard
              </li>
              <li className="flex gap-2 items-center">
                <MdOutlineAutoGraph />
                Global monitoring network
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineNotification />
                Advanced health checks
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          className="border rounded-2xl  bg-secondary/20 before:size-52 before:-right-20 before:-bottom-[30%] before:rounded-full before:bg-primary before:absolute before:-z-10 before:content-[''] before:blur-2xl overflow-hidden relative backdrop:blur-lg"
          variants={itemVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="p-12 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <PiTimerBold className="size-10 bg-accent p-2 rounded-md" />
                <h3 className="text-3xl font-bold">Smart Check Intervals</h3>
              </div>
              <p className="opacity-75 text-pretty">
                Customize monitoring frequency from 30 seconds to 15 minutes.
                AI-powered scheduling optimizes checks based on your service
                patterns.
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <MdDashboard />
                Adaptive scheduling
              </li>
              <li className="flex gap-2 items-center">
                <MdOutlineAutoGraph />
                Pattern recognition
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineNotification />
                Resource optimization
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          className="border rounded-2xl bg-secondary/20 before:size-52 before:-right-20 before:-bottom-[30%] before:rounded-full before:bg-primary before:absolute before:-z-10 before:content-[''] before:blur-2xl overflow-hidden relative backdrop:blur-lg"
          variants={itemVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="p-12 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <MdDashboard className="size-10 bg-accent p-2 rounded-md" />
                <h3 className="text-3xl font-bold">Dashboard & Incidents</h3>
              </div>
              <p className="opacity-75 text-pretty">
                Beautiful dashboards with real-time metrics and comprehensive
                incident management. Track issues, analyze root causes, and
                monitor resolution progress.
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <MdDashboard />
                Real-time dashboards
              </li>
              <li className="flex gap-2 items-center">
                <MdOutlineAutoGraph />
                Incident tracking
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineNotification />
                Root cause analysis
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Feature 4 */}
        <motion.div
          className="border md:col-span-2 rounded-2xl bg-secondary/20 before:size-52 before:-right-20 before:-top-[30%] before:rounded-full before:bg-primary before:absolute before:-z-10 before:content-[''] before:blur-2xl overflow-hidden relative backdrop:blur-lg"
          variants={itemVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="p-12 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <IoMdNotifications className="size-10 bg-accent p-2 rounded-md" />
                <h3 className="text-3xl font-bold">Intelligent Alert System</h3>
              </div>
              <p className="opacity-75 text-pretty">
                Smart notifications with AI-powered noise reduction. Get alerts
                via Email, Discord, Slack, Teams, or custom webhooks with
                intelligent escalation.
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <MdDashboard />
                Multi-channel delivery
              </li>
              <li className="flex gap-2 items-center">
                <MdOutlineAutoGraph />
                Smart escalation rules
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineNotification />
                Alert filtering
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="space-y-2"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="text-2xl lg:text-4xl font-bold"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 200,
            }}
          >
            99.99%
          </motion.div>
          <div className="opacity-75 text-sm md:text-lg">Monitoring Uptime</div>
        </motion.div>
        <motion.div
          className="space-y-2"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="text-2xl lg:text-4xl font-bold"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              type: "spring",
              stiffness: 200,
            }}
          >
            &lt;15s
          </motion.div>
          <div className="opacity-75 text-sm md:text-lg">Detection Time</div>
        </motion.div>
        <motion.div
          className="space-y-2"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="text-2xl lg:text-4xl font-bold"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              type: "spring",
              stiffness: 200,
            }}
          >
            24/7
          </motion.div>
          <div className="opacity-75 text-sm md:text-lg">Global Coverage</div>
        </motion.div>
        <motion.div
          className="space-y-2"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="text-2xl lg:text-4xl font-bold"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.6,
              type: "spring",
              stiffness: 200,
            }}
          >
            4
          </motion.div>
          <div className="opacity-75 text-sm md:text-lg">Integrations</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
