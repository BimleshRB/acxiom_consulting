"use client"

import Link from "next/link"
import { useStore } from "@/lib/store"

export default function VendorDashboard() {
  const { currentUser } = useStore()
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center">
      <div className="bg-[#4f81c7] text-white w-full py-10 text-center shadow-md border-b-4 border-[#3d6cae]">
         <h1 className="text-3xl font-black uppercase tracking-widest mb-2">Welcome</h1>
         <p className="text-xl font-medium opacity-90">{currentUser?.name || 'Vendor'}</p>
      </div>
      
      <div className="p-8 w-full max-w-4xl flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full">
           <Link href="/vendor/items" className="bg-[#e2e2e2] border-[4px] border-[#a0a0a0] rounded-none px-6 py-8 text-black text-center font-bold text-lg hover:bg-white hover:border-[#4f81c7] hover:text-[#4f81c7] transition-all shadow-lg flex flex-col items-center justify-center gap-2 group">
              <span className="text-3xl">📦</span>
              YOUR ITEMS
           </Link>
           <Link href="/vendor/items/add" className="bg-[#e2e2e2] border-[4px] border-[#a0a0a0] rounded-none px-6 py-8 text-black text-center font-bold text-lg hover:bg-white hover:border-[#4f81c7] hover:text-[#4f81c7] transition-all shadow-lg flex flex-col items-center justify-center gap-2 group">
              <span className="text-3xl">➕</span>
              ADD NEW ITEM
           </Link>
           <Link href="/vendor/requests" className="bg-[#e2e2e2] border-[4px] border-[#a0a0a0] rounded-none px-6 py-8 text-black text-center font-bold text-lg hover:bg-white hover:border-[#4f81c7] hover:text-[#4f81c7] transition-all shadow-lg flex flex-col items-center justify-center gap-2 group">
              <span className="text-3xl">💳</span>
              TRANSACTION
           </Link>
        </div>
      </div>

      <div className="mt-auto py-8 text-gray-400 text-xs font-bold uppercase tracking-widest">
        Event Management System &copy; 2026
      </div>
    </div>
  )
}
