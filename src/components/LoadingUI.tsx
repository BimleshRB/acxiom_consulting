"use client"

export default function LoadingUI() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="bg-white border-4 border-gray-400 p-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-[#4f81c7] animate-pulse"></div>
         <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-8 border-gray-200 border-t-[#4f81c7] rounded-full animate-spin"></div>
            <div className="text-center">
               <p className="font-black uppercase tracking-tighter text-xl text-slate-800">Processing Request</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Synchronizing System Nodes...</p>
            </div>
         </div>
      </div>
    </div>
  )
}
