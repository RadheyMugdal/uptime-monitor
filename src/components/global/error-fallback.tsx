'use client'
import { TbFaceIdError } from "react-icons/tb";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
const ErrorFallback = ({ error }: { error: string }) => {
    return (
        <div className="flex flex-col gap-14 items-center justify-center w-full h-full">
            <div className="flex flex-col gap-4 items-center justify-center">
                <TbFaceIdError size={100} className="text-red-500" />
                <div className="flex flex-col gap-4 items-center justify-center">
                    <h2 className=" text-2xl text-center md:text-3xl lg:text-5xl font-bold ">Something went wrong</h2>
                    <p className="text-center opacity-80">{error}</p>
                </div>
            </div>
            <Button onClick={() => window.location.reload()} size={"lg"} >
                <RefreshCcw />Reload Page</Button>
        </div >
    )
}

export default ErrorFallback
