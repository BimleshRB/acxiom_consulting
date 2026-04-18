"use client"

import Link from "next/link"

export default function AdminMembershipsMenu() {
  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#BDE0F6] border-4 border-gray-400 p-10 shadow-2xl relative overflow-hidden">
           <div className="mb-8 border-b-2 border-slate-400 pb-4">
              <h1 className="text-black font-black uppercase tracking-tighter text-3xl">Membership Maintenance</h1>
              <p className="text-[10px] font-black text-[#4f81c7] uppercase tracking-widest mt-1">Select an Administrative Action</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/admin/maintenance/memberships/add" className="group">
                 <div className="bg-white border-4 border-[#4f81c7] p-8 h-full flex flex-col items-center justify-center gap-4 hover:bg-blue-50 transition-all shadow-lg active:translate-y-1">
                    <span className="text-4xl">➕</span>
                    <span className="text-xl font-black uppercase text-[#4f81c7] group-hover:scale-110 transition-transform">Add Membership</span>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center">Register new vendor packages</p>
                 </div>
              </Link>

              <Link href="/admin/maintenance/memberships/update" className="group">
                 <div className="bg-white border-4 border-[#4f81c7] p-8 h-full flex flex-col items-center justify-center gap-4 hover:bg-blue-50 transition-all shadow-lg active:translate-y-1">
                    <span className="text-4xl">🔄</span>
                    <span className="text-xl font-black uppercase text-[#4f81c7] group-hover:scale-110 transition-transform">Update Membership</span>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center">Manage, Extend or Cancel Records</p>
                 </div>
              </Link>
           </div>
           
           <div className="mt-12 flex justify-center">
              <Link href="/admin/dashboard" className="bg-[#4f81c7] text-white px-8 py-2 font-black uppercase text-[10px] shadow border border-black hover:bg-[#3460C0]">
                 Back to Dashboard
              </Link>
           </div>
        </div>
      </div>
    </div>
  )
}
