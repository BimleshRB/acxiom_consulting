"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { addProductAction } from "@/actions/vendor"

export default function AddVendorItem() {
  const router = useRouter()
  const { currentUser } = useStore()
  
  const [name, setName] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    setLoading(true)
    await addProductAction(currentUser.id, name, parseFloat(price), imageUrl)
    setLoading(false)
    router.push('/vendor/items')
  }

  return (
    <div className="min-h-screen bg-gray-200 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
         <div className="flex justify-between items-center mb-10">
            <Link href="/vendor/items" className="bg-[#4f81c7] text-white px-8 py-2 border-2 border-white font-black uppercase text-[10px] shadow-md hover:bg-[#3460C0] transition-colors">
               ← Back to Status
            </Link>
            <h1 className="bg-white border-4 border-gray-400 px-10 py-3 font-black uppercase text-xl shadow-lg tracking-tighter">
               Register New Item
            </h1>
         </div>

         <div className="bg-[#BDE0F6] border-4 border-gray-400 p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4f81c7] transform rotate-45 translate-x-16 translate-y-[-16px] opacity-10"></div>
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
               <div className="flex flex-col gap-2">
                  <label className="bg-[#4f81c7] text-white self-start px-4 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm">Product Designation</label>
                  <div className="bg-white border-2 border-gray-400 p-1 shadow-inner">
                     <input 
                       type="text" 
                       placeholder="E.G. LUXURY CATERING PACKAGE" 
                       value={name}
                       onChange={e => setName(e.target.value.toUpperCase())}
                       className="w-full bg-gray-100 p-3 font-bold text-sm uppercase outline-none focus:bg-white transition-colors"
                       required
                     />
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <label className="bg-[#4f81c7] text-white self-start px-4 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm">Standard Price (Rs)</label>
                  <div className="bg-white border-2 border-gray-400 p-1 shadow-inner">
                     <input 
                       type="number" 
                       placeholder="0.00" 
                       value={price}
                       onChange={e => setPrice(e.target.value)}
                       className="w-full bg-gray-100 p-3 font-bold text-sm uppercase outline-none focus:bg-white transition-colors"
                       required
                     />
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <label className="bg-[#4f81c7] text-white self-start px-4 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm">Asset Reference (URL)</label>
                  <div className="bg-white border-2 border-gray-400 p-1 shadow-inner">
                     <input 
                       type="text" 
                       placeholder="HTTP://IMAGE-LINK.COM/ASSET.JPG" 
                       value={imageUrl}
                       onChange={e => setImageUrl(e.target.value)}
                       className="w-full bg-gray-100 p-3 font-bold text-sm uppercase outline-none focus:bg-white transition-colors"
                     />
                  </div>
                  <p className="text-[9px] font-bold text-blue-600 uppercase mt-1 italic opacity-60">* Provide a cloud hosted image link for better rendering.</p>
               </div>

               <div className="pt-6 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-[#4f81c7] hover:bg-[#3460C0] text-white px-12 py-3 font-black uppercase text-sm shadow-xl border-b-4 border-black transition-transform active:translate-y-1 disabled:opacity-50"
                  >
                     {loading ? 'Processing...' : 'Deploy Product →'}
                  </button>
               </div>
            </form>
         </div>

         <div className="mt-8 bg-white border-2 border-gray-400 p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center shadow">
            Submission creates a new inventory record for vendor ID: {currentUser?.id.slice(-8).toUpperCase()}
         </div>
      </div>
    </div>
  )
}
