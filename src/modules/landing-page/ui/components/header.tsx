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

        <header className=' w-[90vw] md:w-[80vw] mx-auto py-2 md:py-4 px-6 md:px-10 rounded-full fixed top-10 inset-x-1/2 -translate-x-1/2 bg-[#0A0A0A]/30 backdrop-blur-lg border-white/10 border z-30' >
            <div className='flex justify-between items-center'>
                {/* Logo */}
                <h1 className='flex gap-2 text-lg font-semibold'>Uptime</h1>

                {/* Desktop nav */}
                <div className='hidden md:flex items-center gap-6'>
                    <ul className='flex gap-3 [&>li]:text-sm [&>li]:text-foreground/70 [&>li]:hover:text-foreground [&>li]:cursor-pointer [&>li]:transition-all [&>li]:duration-200 [&>li]:ease-in-out'>
                        {links.map(link => (
                            <li key={link.name}>
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <Button size="sm" className='rounded-full'>
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
