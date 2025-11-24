"use client";

import Link from "next/link";
import {
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import { motion } from "motion/react";

const footerLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Status Page", href: "#" },
  { name: "Contact", href: "#" },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
      }}
      className="py-10 w-full max-w-7xl mx-auto px-4 md:px-6"
    >
      {/* Separator */}
      <motion.div
        variants={{
          hidden: { scaleX: 0, originX: 0 },
          visible: { scaleX: 1, originX: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
        className="w-full h-px bg-border/50 mb-10"
      />

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="flex flex-col md:flex-row justify-between items-center gap-8"
      >
        {/* Left: Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Logo & Version */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 13a7 7 0 1 0 14 0a7 7 0 0 0 -14 0" />
                <path d="M7 4l-2.75 2" />
                <path d="M17 4l2.75 2" />
                <path d="M8 13h1l2 3l2 -6l2 3h1" />
              </svg>
            </div>
            <span className="text-lg">UptimeWatch</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
            v1.0
          </span>
        </div>
      </motion.div>

      {/* Bottom Row */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} UptimeWatch. All rights reserved.
        </p>

        {/* Social Buttons */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full"
              aria-label={social.label}
            >
              <social.icon className="size-5" />
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.footer>
  );
}

