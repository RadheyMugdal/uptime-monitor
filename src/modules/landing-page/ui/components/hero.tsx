"use client";
import DarkVeil from '@/components/DarkVeil'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Header from './header';

const Hero = () => {


    return (
        <div className='w-screen min-h-screen relative'>
            {/* Background */}
            <div className='absolute top-0 left-0 w-full h-[800px] z-10'>
                <DarkVeil />
            </div>

            <div className='relative w-full h-full z-20'>
                <Header />
                {/* Hero content */}
                <div className='flex flex-col gap-10 pt-44 items-center justify-center  px-8  w-full h-full'>
                    <Badge className='bg-green-600/20 backdrop-blur-3xl rounded-full border border-white/20'>
                        Monitor Your Services 24/7
                    </Badge>

                    <div className='flex flex-col gap-6 items-center justify-center max-w-[80%] md:max-w-[60%]'>
                        <h1 className=' text-3xl md:text-5xl font-bold text-center text-balance'>
                            Never Miss a Downtime Again
                        </h1>
                        <p className='text-center text-pretty lg:text-lg opacity-75'>
                            Monitor your websites, APIs, and services 24/7. Get instant alerts when something goes wrong and keep your users happy with maximum uptime.
                        </p>
                    </div>

                    <div className='flex gap-4  flex-wrap items-center justify-center'>
                        <Button className='rounded-full'>
                            Start monitoring free
                        </Button>
                        <Button variant="outline" className='rounded-full' size="lg">
                            View Demo
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
