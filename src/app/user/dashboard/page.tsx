"use client"

import Link from "next/link"

export default function UserDashboard() {
  return (
    <div className="bg-gray-200 min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl text-center mt-12 mb-16">
        <h1 className="text-4xl font-black uppercase text-gray-800 tracking-tighter mb-2">My Planner</h1>
        <div className="h-1 w-24 bg-[#4f81c7] mx-auto"></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2 italic">Standardized Flow Management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
         <Link href="/user/vendors" className="bg-white border-4 border-[#4f81c7] p-8 shadow-xl font-black hover:bg-[#4f81c7] hover:text-white transition-all text-xl text-center flex flex-col items-center justify-center gap-4 group">
            <span className="text-4xl group-hover:rotate-12 transition-transform">🏪</span>
            <span className="uppercase tracking-tighter">Vendor List</span>
         </Link>
         
         <Link href="/user/cart" className="bg-white border-4 border border-[#4f81c7] p-8 shadow-xl font-black hover:bg-[#4f81c7] hover:text-white transition-all text-xl text-center flex flex-col items-center justify-center gap-4 group">
            <span className="text-4xl group-hover:scale-110 transition-transform">🛒</span>
            <span className="uppercase tracking-tighter">My Cart</span>
         </Link>

         <Link href="/user/guests" className="bg-white border-4 border-[#4f81c7] p-8 shadow-xl font-black hover:bg-[#4f81c7] hover:text-white transition-all text-xl text-center flex flex-col items-center justify-center gap-4 group">
            <span className="text-4xl group-hover:rotate-[-12px] transition-transform">👥</span>
            <span className="uppercase tracking-tighter">Guest List</span>
         </Link>

         <Link href="/user/orders" className="bg-white border-4 border-[#4f81c7] p-8 shadow-xl font-black hover:bg-[#4f81c7] hover:text-white transition-all text-xl text-center flex flex-col items-center justify-center gap-4 group">
            <span className="text-4xl group-hover:scale-110 transition-transform">📋</span>
            <span className="uppercase tracking-tighter">Order Status</span>
         </Link>
      </div>

      {/* Reports secondary action */}
      <div className="mt-12 w-full max-w-6xl">
        <Link href="/user/reports" className="block bg-[#BDE0F6] border-2 border-[#4f81c7] p-4 text-center font-black uppercase text-xs tracking-widest text-[#4f81c7] hover:bg-[#4f81c7] hover:text-white transition-colors">
           Generate personal transaction reports
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
         {['Catering', 'Florist', 'Decoration', 'Lighting'].map(cat => (
           <div key={cat} className="bg-white p-4 text-center font-bold text-[10px] uppercase tracking-widest text-gray-400 border-2 border-dashed border-gray-300">
             {cat} Service
           </div>
         ))}
      </div>
    </div>
  )
}
