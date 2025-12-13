import { Loader2 } from "lucide-react"

const Loader = ({ loadingText }: { loadingText: string }) => {
  return (
    <div className='w-full h-full flex  flex-col  gap-2 items-center justify-center'>
      <Loader2 className=" text-primary animate-spin" />
      <p className="opacity-80 text-sm font-semibold">{loadingText}</p>
    </div>
  )
}

export default Loader
