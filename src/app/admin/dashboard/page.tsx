"use client"

import Link from "next/link"
import { useStore } from "@/lib/store"

export default function AdminDashboard() {
  const { currentUser } = useStore()
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="bg-[#4f81c7] text-white w-full py-8 px-12 shadow-md flex justify-between items-center border-b-4 border-black">
         <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter italic">Administrative Control Panel</h1>
            <p className="text-[10px] opacity-80 font-bold uppercase tracking-[0.4em]">{currentUser?.name} | system.admin</p>
         </div>
      </div>

      <div className="p-12 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-12">
            
            <div className="bg-[#BDE0F6] border-4 border-gray-400 p-12 shadow-2xl relative">
               <div className="absolute top-0 right-0 bg-[#4f81c7] text-white px-4 py-1 text-[9px] font-black uppercase tracking-widest">Master Menu</div>
               <h2 className="font-black text-2xl uppercase tracking-tighter mb-10 border-b-2 border-slate-400 pb-2">Maintenence Options</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Link href="/admin/maintenance/memberships" className="bg-white border-4 border-black p-8 group hover:bg-[#4f81c7] transition-all">
                     <div className="flex flex-col items-center gap-4">
                        <span className="text-4xl group-hover:scale-110 transition-transform">💳</span>
                        <span className="font-black uppercase text-sm group-hover:text-white">Membership Management</span>
                     </div>
                  </Link>
                  
                  <Link href="/admin/maintenance/users" className="bg-white border-4 border-black p-8 group hover:bg-[#4f81c7] transition-all">
                     <div className="flex flex-col items-center gap-4">
                        <span className="text-4xl group-hover:scale-110 transition-transform">👥</span>
                        <span className="font-black uppercase text-sm group-hover:text-white">User/Vendor Registry</span>
                     </div>
                  </Link>

                  <Link href="/admin/reports" className="bg-white border-4 border-black p-8 group hover:bg-[#4f81c7] transition-all">
                     <div className="flex flex-col items-center gap-4">
                        <span className="text-4xl group-hover:scale-110 transition-transform">📊</span>
                        <span className="font-black uppercase text-sm group-hover:text-white">System Reports</span>
                     </div>
                  </Link>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white border-4 border-gray-400 p-8 shadow-lg">
                  <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-4 inline-block border-b-2 border-slate-200">Maintenance Shortcuts</h3>
                  <div className="flex flex-wrap gap-2">
                     <Link href="/admin/maintenance/memberships/add" className="bg-gray-100 px-4 py-2 text-[10px] font-black uppercase hover:bg-black hover:text-white transition-colors">Add Membership</Link>
                     <Link href="/admin/maintenance/memberships/update" className="bg-gray-100 px-4 py-2 text-[10px] font-black uppercase hover:bg-black hover:text-white transition-colors">Update Status</Link>
                     <Link href="/admin/maintenance/users" className="bg-gray-100 px-4 py-2 text-[10px] font-black uppercase hover:bg-black hover:text-white transition-colors">Cleanup DB</Link>
                  </div>
               </div>

               <div className="bg-white border-4 border-gray-400 p-8 shadow-lg flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">
                     All administrative actions are logged according to the system's security protocol. Unauthorized access is strictly prohibited.
                  </p>
               </div>
            </div>
        </div>
      </div>
    </div>
  )
}
