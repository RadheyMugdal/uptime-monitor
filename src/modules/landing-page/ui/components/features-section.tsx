"use client";
import { motion, type Variant } from "motion/react";
import { PiTimerBold } from "react-icons/pi";
import { MdDashboard, MdOutlineAutoGraph, MdWeb } from "react-icons/md";
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
    <section id="features" className="py-24 px-8 space-y-32 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div
        className="text-center  my-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span>features</span>
        <motion.h2
          className="text-3xl md:text-5xl font-medium mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Everything you need to stay online
        </motion.h2>
        <motion.p
          className=" opacity-60  max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Enterprise-grade monitoring tools designed to help you detect downtime
          instantly and resolve issues faster.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Feature 1: Global Latency Monitoring */}
        <motion.div
          className="group border  rounded-none md:col-span-2  bg-secondary/20 before:size-52 before:-right-20 before:-top-[30%] before:rounded-full before:bg-primary/50 before:absolute before:-z-10 before:content-[''] before:blur-3xl overflow-hidden relative backdrop:blur-lg hover:border-primary/50 transition-colors duration-500"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="p-12 flex flex-col md:flex-row gap-8 items-center relative z-10">
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="w-fit">
                    <MdOutlineAutoGraph className="size-10 bg-accent p-2 rounded-md" />
                  </div>
                  <h3 className="text-3xl">Global Latency Monitoring</h3>
                </div>
                <p className="opacity-75 text-pretty">
                  Track response times from multiple regions worldwide. Identify
                  performance bottlenecks before they impact your users.
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2 items-center">
                  <MdDashboard className="text-primary" />
                  Multi-region checks
                </li>
                <li className="flex gap-2 items-center">
                  <MdOutlineAutoGraph className="text-primary" />
                  Performance history
                </li>
                <li className="flex items-center gap-2">
                  <AiOutlineNotification className="text-primary" />
                  Slow response alerts
                </li>
              </ul>
            </div>
            {/* Visual Element: Response Time Card */}
            <div className="flex-1 w-full max-w-xs">
              <motion.div
                className="bg-background/50 rounded-xl border p-4 backdrop-blur-sm space-y-4"
                variants={{
                  hover: { y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }
                }}
              >
                <div className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium">us-east-1</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Operational</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm text-muted-foreground">Latency</span>
                    <span className="text-2xl font-bold text-green-500">45ms</span>
                  </div>
                  {/* Fake Graph */}
                  <div className="flex items-end gap-1 h-12">
                    {[30, 45, 25, 60, 35, 20, 24, 30, 45, 25].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-primary/20 rounded-t-sm"
                        initial={{ height: "20%" }}
                        whileInView={{ height: `${h}%` }}
                        variants={{
                          hover: { height: [`${h}%`, `${Math.min(h + 30, 100)}%`, `${h}%`], transition: { duration: 1.5, repeat: Infinity, delay: i * 0.1 } }
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%]"
            variants={{
              hover: { translateX: "200%" }
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Feature 2: SSL & Domain Health */}
        <motion.div
          className="group border rounded-none bg-secondary/20 before:size-52 before:-right-20 before:-bottom-[30%] before:rounded-full before:bg-primary/50 before:absolute before:-z-10 before:content-[''] before:blur-3xl overflow-hidden relative backdrop:blur-lg hover:border-primary/50 transition-colors duration-500"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="p-8 flex flex-col gap-8 relative z-10 h-full justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="w-fit">
                  <div className="size-10 bg-accent p-2 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  </div>
                </div>
                <h3 className="text-2xl ">SSL Monitoring</h3>
              </div>
              <p className="opacity-75 text-sm text-pretty">
                Never let a certificate expire. Get notified 30, 14, and 7 days before expiration.
              </p>
            </div>

            {/* Visual Element: SSL Card */}
            <motion.div
              className="bg-background/50 rounded-xl border p-4 backdrop-blur-sm space-y-3"
              variants={{
                hover: { scale: 1.02 }
              }}
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <div>
                  <div className="text-xs font-bold">example.com</div>
                  <div className="text-[10px] text-muted-foreground">Issued by Let's Encrypt</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted-foreground">Expires in</span>
                  <span className="font-mono font-bold text-green-500">89 days</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: "100%" }}
                    variants={{
                      hover: { opacity: [1, 0.5, 1], transition: { duration: 2, repeat: Infinity } }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature 3: Root Cause Analysis */}
        <motion.div
          className="group border rounded-none bg-secondary/20 before:size-52 before:-right-20 before:-bottom-[30%] before:rounded-full before:bg-primary/50 before:absolute before:-z-10 before:content-[''] before:blur-3xl overflow-hidden relative backdrop:blur-lg hover:border-primary/50 transition-colors duration-500"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="p-8 flex flex-col gap-8 relative z-10 h-full justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="w-fit">
                  <div className="size-10 bg-accent p-2 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></svg>
                  </div>
                </div>
                <h3 className="text-2xl">Root Cause Analysis</h3>
              </div>
              <p className="opacity-75 text-sm text-pretty">
                Don't just know it's down. See headers, error codes, and traceroutes.
              </p>
            </div>

            {/* Visual Element: Terminal */}
            <motion.div
              className="bg-black/80 rounded-xl border border-white/10 p-3 backdrop-blur-sm space-y-1 font-mono text-[10px] text-green-400 overflow-hidden"
              variants={{
                hover: { scale: 1.02 }
              }}
            >
              <div className="flex gap-1.5 mb-2 opacity-50">
                <div className="size-2 rounded-full bg-red-500" />
                <div className="size-2 rounded-full bg-yellow-500" />
                <div className="size-2 rounded-full bg-green-500" />
              </div>
              <div>$ curl -I api.service.com</div>
              <div className="text-red-400">HTTP/1.1 503 Service Unavailable</div>
              <div className="text-muted-foreground">X-Cache: MISS</div>
              <motion.div
                className="flex gap-1"
                variants={{
                  hover: { opacity: 1 }
                }}
              >
                <span>$</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-1.5 h-3 bg-green-400 block"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature 4: Multi-Channel Alerts */}
        <motion.div
          className="group border md:col-span-2 rounded-none bg-secondary/20 before:size-52 before:-right-20 before:-top-[30%] before:rounded-full before:bg-primary/50 before:absolute before:-z-10 before:content-[''] before:blur-3xl overflow-hidden relative backdrop:blur-lg hover:border-primary/50 transition-colors duration-500"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="p-12 flex flex-col md:flex-row gap-8 items-center relative z-10">
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="w-fit">
                    <IoMdNotifications className="size-10 bg-accent p-2 rounded-md" />
                  </div>
                  <h3 className="text-3xl ">Multi-Channel Alerts</h3>
                </div>
                <p className="opacity-75 text-pretty">
                  Get notified where you work. Integrate seamlessly with Slack, Discord, Teams, Email, and custom webhooks.
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2 items-center">
                  <MdDashboard className="text-primary" />
                  Instant delivery
                </li>
                <li className="flex gap-2 items-center">
                  <MdOutlineAutoGraph className="text-primary" />
                  Customizable thresholds
                </li>
                <li className="flex items-center gap-2">
                  <AiOutlineNotification className="text-primary" />
                  Shift scheduling
                </li>
              </ul>
            </div>
            {/* Visual Element: Notification Stack */}
            <div className="flex-1 w-full max-w-xs relative h-40">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 right-0 bg-background/80 backdrop-blur-md border rounded-xl p-3 shadow-lg"
                  style={{
                    top: i * 15,
                    zIndex: 3 - i,
                    scale: 1 - i * 0.05,
                  }}
                  initial={{ x: 0, opacity: 1 - i * 0.2 }}
                  variants={{
                    hover: {
                      y: i === 0 ? -10 : 0,
                      x: i === 0 ? 5 : 0,
                      transition: { type: "spring", stiffness: 300 }
                    }
                  }}
                >
                  <div className="flex gap-3 items-start">
                    <div className={`size-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-[#E01E5A]/10 text-[#E01E5A]' : i === 1 ? 'bg-[#5865F2]/10 text-[#5865F2]' : 'bg-blue-500/10 text-blue-500'}`}>
                      {i === 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                      ) : i === 1 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><path d="M7.5 7.5c3.5-1 5.5-1 9 0 1.5.43 2 2.25 2 3.25V12c0 1.25-.5 2.5-1 3l-1 1c-.5.5-1.25 1-2 1H9c-.75 0-1.5-.5-2-1l-1-1c-.5-.5-1-1.75-1-3V10.75c0-1 .5-2.82 2-3.25Z" /></svg>
                      ) : (
                        <IoMdNotifications />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold">{i === 0 ? 'PagerDuty' : i === 1 ? 'Discord' : 'Email'}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {i === 0 ? 'Critical: API Latency > 500ms' : i === 1 ? 'New incident created #1234' : 'Weekly uptime report'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feature 5: Status Pages */}
        <motion.div
          className="group border md:col-span-3 rounded-none bg-secondary/20 before:size-52 before:-left-20 before:-bottom-[30%] before:rounded-full before:bg-primary/50 before:absolute before:-z-10 before:content-[''] before:blur-3xl overflow-hidden relative backdrop:blur-lg hover:border-primary/50 transition-colors duration-500"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="p-12 flex flex-col md:flex-row gap-8 items-center relative z-10">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="w-fit">
                  <MdWeb className="size-10 bg-accent p-2 rounded-md" />
                </div>
                <h3 className="text-3xl ">Public Status Pages</h3>
              </div>
              <p className="opacity-75 text-pretty max-w-2xl">
                Build trust with your users by showcasing your service reliability.
                Create beautiful, branded public status pages that keep your customers informed during incidents and maintenance.
              </p>
              <ul className=" flex flex-col gap-2 mt-2">
                <li className="flex gap-2 items-center">
                  <MdDashboard className="text-primary" />
                  Custom branding & domains
                </li>
                <li className="flex gap-2 items-center">
                  <MdOutlineAutoGraph className="text-primary" />
                  Historical uptime data
                </li>
                <li className="flex items-center gap-2">
                  <AiOutlineNotification className="text-primary" />
                  Subscriber notifications
                </li>
                <li className="flex items-center gap-2">
                  <MdWeb className="text-primary" />
                  Incident timeline
                </li>
              </ul>
            </div>
            {/* Visual Element for Status Page */}
            <div className="flex-1 w-full max-w-md">
              <motion.div
                className="bg-background/50 rounded-xl border p-4 backdrop-blur-sm"
                variants={{
                  hover: { y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }
                }}
              >
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                  <div className="flex gap-1.5">
                    <div className="size-2.5 rounded-full bg-red-500/50" />
                    <div className="size-2.5 rounded-full bg-yellow-500/50" />
                    <div className="size-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="h-2 w-20 bg-muted rounded-full ml-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium text-green-500">All Systems Operational</span>
                    </div>
                    <span className="text-xs text-muted-foreground">99.99%</span>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="h-2 w-24 bg-muted rounded-full" />
                        <div className="flex gap-0.5">
                          {[...Array(10)].map((_, j) => (
                            <motion.div
                              key={j}
                              className="w-1 h-4 rounded-full bg-green-500/80"
                              initial={{ opacity: 0.5 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: j * 0.05 }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
