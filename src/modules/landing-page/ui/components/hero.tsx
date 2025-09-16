"use client";
import DarkVeil from "@/components/DarkVeil";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "./header";
import Image from "next/image";
import { motion } from "framer-motion";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";

const Hero = () => {
  const { data } = authClient.useSession()
  const router = useRouter()
  const handleClick = () => {
    if (data?.session) {
      router.push('/dashboard/monitors')
      return
    }
    router.push('/signin')
  }
  return (
    <div className="w-screen min-h-screen relative">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[800px]   z-10">
        <DarkVeil />
      </div>

      <div className="relative w-full h-full z-20">
        <Header isLoggedIn={!!data?.session} />
        {/* Hero content */}
        <div className="flex flex-col gap-10 pt-44 items-center justify-center  px-8  w-full h-full">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge className=" bg-green-600/20   my-3  light:text-black backdrop:blur-xl  rounded-full">
              Monitor Your Services 24/7
            </Badge>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 items-center justify-center max-w-[80%] md:max-w-[60%]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h1
              className=" text-3xl md:text-5xl font-bold text-center text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Never Miss a Downtime Again
            </motion.h1>
            <motion.p
              className="text-center text-pretty lg:text-lg opacity-75"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Monitor your websites, APIs, and services 24/7. Get instant alerts
              when something goes wrong and keep your users happy with maximum
              uptime.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex gap-4  flex-wrap items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button onClick={handleClick}>{
                !!data?.session ? "Go to Dashboard" : "Get Started Now"
              }</Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className=" p-1 bg-primary/60 backdrop:blur-lg border mt-20 rounded-xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/product.png"
              alt="hero"
              width={1000}
              height={1000}
              className=" rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
