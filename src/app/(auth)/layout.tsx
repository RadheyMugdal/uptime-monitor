import Link from "next/link"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" h-screen w-screen relative">
            <Link href="/" className=" absolute top-4 left-4 flex items-center gap-1">
                <div className=" flex  flex-1  text-left text-lg  items-center gap-1 font-semibold leading-tight">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={30}
                        height={30}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-alarm-average"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 13a7 7 0 1 0 14 0a7 7 0 0 0 -14 0" />
                        <path d="M7 4l-2.75 2" />
                        <path d="M17 4l2.75 2" />
                        <path d="M8 13h1l2 3l2 -6l2 3h1" />
                    </svg>
                    <div>
                        <span>Uptime</span>
                        <span className="font-bold">Watch</span>
                    </div>
                </div>
            </Link>
            {children}
        </div>
    )
}

export default AuthLayout
