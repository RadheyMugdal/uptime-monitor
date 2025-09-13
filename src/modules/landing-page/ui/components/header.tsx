"use client";
import { Button } from '@/components/ui/button'
import { Squash as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { useState } from 'react';

import { AnimatePresence, motion } from "motion/react";
const links = [
    { name: "Home", href: "#" },
    { name: "Pricing", href: "#pricing" },
    { name: "Features", href: "#features" }
]

const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: "auto",
        transition: { duration: 0.4, ease: "easeInOut" as const, when: "beforeChildren", staggerChildren: 0.1 },
    },
    exit: {
        opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" as const }

    }
}
const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};
const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
};


const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (

        <header className=' w-[90vw] md:w-[80vw] mx-auto py-2 md:py-4 px-6 md:px-10 rounded-full fixed top-10 inset-x-1/2 -translate-x-1/2 bg-secondary/30  dark:bg-[#0A0A0A]/30 backdrop-blur-lg border z-30' >
            <div className='flex justify-between items-center'>
                {/* Logo */}
                <div className=" flex  flex-1  text-left text-lg  items-center gap-1 font-semibold leading-tight">
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alarm-average"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 13a7 7 0 1 0 14 0a7 7 0 0 0 -14 0" /><path d="M7 4l-2.75 2" /><path d="M17 4l2.75 2" /><path d="M8 13h1l2 3l2 -6l2 3h1" /></svg>
                    <div>
                        <span>
                            Uptime
                        </span>
                        <span className="font-bold">
                            Watch
                        </span>
                    </div>
                </div>


                {/* Desktop nav */}
                <div className='hidden md:flex items-center gap-6'>
                    <ul className='flex gap-3 [&>li]:text-sm [&>li]:text-foreground/70 [&>li]:hover:text-foreground [&>li]:cursor-pointer [&>li]:transition-all [&>li]:duration-200 [&>li]:ease-in-out'>
                        {links.map(link => (
                            <li key={link.name}>
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <Button size="sm" >
                        Get started
                    </Button>
                </div>

                {/* Mobile hamburger */}
                <div className='md:hidden'>
                    <Hamburger toggled={isOpen} toggle={setIsOpen} size={24} />
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className='fixed top-18 left-1/2 -translate-x-1/2 w-[90vw] md:hidden bg-[#0A0A0A]/90 backdrop-blur-lg rounded-xl p-6 border border-white/10 flex flex-col gap-4 z-40'
                    >
                        {links.map(link => (
                            <motion.div key={link.name} variants={linkVariants}>
                                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                                    <span className='block  text-foreground/80 hover:text-foreground transition'>{link.name}</span>
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div variants={buttonVariants}>
                            <Button size="sm" className='rounded-full w-full' onClick={() => setIsOpen(false)}>
                                Get started
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </header >
    )
}

export default Header
