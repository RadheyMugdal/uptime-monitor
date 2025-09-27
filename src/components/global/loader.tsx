const Loader = ({ loadingText }: { loadingText: string }) => {
  return (
    <div className='w-full h-full flex  flex-col  items-center justify-center'>
      <span className="loader"></span>
      <p className="opacity-80 text-sm font-semibold">{loadingText}</p>
    </div>
  )
}

export default Loader
