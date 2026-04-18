"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { getVendorsByCategoryAction } from "@/actions/user"

export default function VendorsList() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  
  const [vendors, setVendors] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getVendorsByCategoryAction(category).then(res => {
      if (res.success && res.data) {
        setVendors(res.data)
      }
      setLoading(false)
    })
  }, [category])

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/user/dashboard" className="bg-white border border-[#a0a0a0] px-6 py-1 text-black font-medium">Home</Link>
      </div>

      <div className="flex flex-wrap gap-10 justify-center mt-12 max-w-6xl mx-auto">
        {loading ? (
           <div className="bg-white border-2 border-dashed border-gray-400 p-20 text-center font-black uppercase text-[#4f81c7] tracking-widest animate-pulse w-full max-w-2xl">
              --- SYNCHRONIZING VENDOR DATA ---
           </div>
        ) : vendors.length === 0 ? (
           <div className="bg-white border-2 border-dashed border-gray-400 p-20 text-center font-black uppercase text-gray-400 tracking-widest w-full max-w-2xl">
              --- No Registered Vendors ---
           </div>
        ) : (
          vendors.map((v, i) => (
            <div key={v.id} className="bg-white border-4 border-gray-400 w-64 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] transition-all flex flex-col items-center">
               <div className="bg-[#4f81c7] w-full p-3 border-b-4 border-black text-center">
                  <span className="text-white font-black uppercase text-sm tracking-tighter">{v.name}</span>
               </div>
               
               <div className="p-8 flex flex-col items-center gap-6 w-full">
                  <div className="w-16 h-16 bg-gray-100 border-2 border-black rounded-full flex items-center justify-center font-black text-2xl text-slate-400 shadow-inner">
                    {v.name.charAt(0)}
                  </div>
                  
                  <div className="w-full h-[2px] bg-gray-100"></div>

                  <div className="text-center space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Identity</p>
                    <p className="text-xs font-bold text-slate-600 truncate px-2">{v.email}</p>
                  </div>

                  <Link 
                    href={`/user/vendors/${v.id}/products`} 
                    className="w-full bg-[#558844] hover:bg-[#457038] text-white py-3 border-2 border-black font-black uppercase text-[10px] text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                  >
                    Enter Shop Console
                  </Link>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
