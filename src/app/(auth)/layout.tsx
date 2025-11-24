import Link from "next/link";
import DarkVeil from "@/components/DarkVeil";


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" h-screen w-screen relative">

            {/*  Diagonal Cross Bottom Left Fade Grid Background */}
            <div
                className="absolute inset-0   -z-10"
                style={{
                    backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
                    backgroundSize: "40px 40px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
                }}
            />
            <div
                className="absolute inset-0   -z-10"
                style={{
                    backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
                    backgroundSize: "40px 40px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)",
                }}
            />
            {/* Your Content/Components */}


            <Link href="/" className=" absolute top-4  left-1/2  -translate-x-1/2 flex mx-auto items-center gap-1">
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
            </Link>
            {children}
        </div>
    )
}

export default AuthLayout
