"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Monitor,
  Mail,
  MessageSquare,
  Twitter,
  Github,
  Linkedin,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Integrations", href: "#integrations" },
    { name: "API", href: "#" },
    { name: "Status Page", href: "#" },
  ],

  Support: [
    { name: "Help Center", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Community", href: "#" },
    { name: "System Status", href: "#" },
    { name: "Security", href: "#" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@uptimemonitor.com", label: "Email" },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer className=" border-t  relative overflow-hidden  max-w-7xl mx-auto">

      <div className="container mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 px-4">
          <div className=" flex  flex-col md:flex-row  justify-between gap-12 ">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >


                <div className=" flex  flex-1  text-left text-2xl items-center gap-1 font-semibold leading-tight">
                  <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alarm-average"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 13a7 7 0 1 0 14 0a7 7 0 0 0 -14 0" /><path d="M7 4l-2.75 2" /><path d="M17 4l2.75 2" /><path d="M8 13h1l2 3l2 -6l2 3h1" /></svg>
                  <div>
                    <span>
                      Uptime
                    </span>
                    <span className="font-bold">
                      Watch
                    </span>
                  </div>
                </div>

                <p className=" opacity-75 max-w-md">
                  The most reliable uptime monitoring service for your websites,
                  APIs, and services. Never miss a downtime again.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      className=" transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="size-4  hover:opacity-75 transition-colors" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className=" grid  grid-cols-1 md:grid-cols-3 gap-12">
              {/* Links Sections */}
              {Object.entries(footerLinks).map(
                ([category, links], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold ">
                      {category}
                    </h3>
                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className=" opacity-75 hover:opacity-100 transition-colors text-sm"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              )}

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-800 py-6 px-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className=" opacity-75 text-sm">
              © 2024 Uptime Monitor. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm opacity-75">
              <span>Made with ❤️ for developers</span>
              <Button
                onClick={scrollToTop}
                variant="ghost"
                size="sm"
                className=" opacity-75 hover:opacity-100"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
