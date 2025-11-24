"use client";
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { UptimeGraphAnimation } from './uptime-graph-animation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion } from 'motion/react'

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=' w-full max-w-7xl bg-primary/20 mx-auto'>
      <header className='p-4 md:p-8 flex items-center justify-between relative'>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=' text-xl font-bold z-50'
        >
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
          </div>
        </motion.h1>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center justify-center gap-8'>
          <nav>
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='flex gap-4 text-sm md:text-base'
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href={"/#features"}>Features</Link>
              </li>
              <li>
                <Link href={"/#integrations"}>Integrations</Link>
              </li>
              <li>
                <Link href={"/#pricing"}>Pricing</Link>
              </li>
            </motion.ul>
          </nav>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href={"/signin"}>
              <Button >
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in duration-200">
            <nav>
              <ul className='flex flex-col items-center gap-8 text-lg font-medium'>
                <li>
                  <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                </li>
                <li>
                  <Link href="/#features" onClick={() => setIsOpen(false)}>Features</Link>
                </li>
                <li>
                  <Link href="/#integrations" onClick={() => setIsOpen(false)}>Integrations</Link>
                </li>
                <li>
                  <Link href="/#pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
                </li>
              </ul>
            </nav>
            <Link href={"/signin"}>
              <Button className='w-full max-w-xs' onClick={() => setIsOpen(false)}>
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* hero section  */}

      <div className='py-16 px-4 md:py-32 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0'>
        <div className='space-y-8 md:space-y-12 text-center md:text-left'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='space-y-6 md:space-y-8'
          >
            <h1 className='text-4xl md:text-6xl text-balance font-medium   leading-18'>
              Downtime Happens. Be the First to Know.
            </h1>
            <p className='text-foreground/70 max-w-full md:max-w-[80%] mx-auto md:mx-0'>
              Monitor your websites, APIs, and servers with 1-minute checks. Get instant alerts via Slack, Discord, Email, and SMS when your services go down.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >

            <Link href={"/signup"}>
              <Button size="lg" className='w-full md:w-auto'>
                <span className="relative flex size-2 mr-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-white"></span>
                </span>
                Start Monitoring Now
              </Button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='relative flex items-center justify-center min-h-[300px] md:min-h-auto'
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />
          <UptimeGraphAnimation />
        </motion.div>
      </div>
    </div>
  )
}

export default Hero