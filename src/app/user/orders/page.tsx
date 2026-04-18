"use client"

import * as React from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { getUserOrdersAction } from "@/actions/user"

export default function UserOrders() {
  const { currentUser } = useStore()
  const [orders, setOrders] = React.useState<any[]>([])

  React.useEffect(() => {
    if (currentUser) {
      getUserOrdersAction(currentUser.id).then(setOrders)
    }
  }, [currentUser])

  return (
    <div className="bg-gray-200 min-h-screen py-12 px-4 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">
         
         <div className="flex justify-between items-center mb-2">
            <Link href="/user/dashboard" className="bg-[#4f81c7] text-white border-2 border-white px-8 py-2 font-black text-[10px] uppercase shadow-md hover:bg-[#3460C0] transition-colors">
               ← Main Dashboard
            </Link>
            <div className="bg-[#4f81c7] text-white border-2 border-white px-10 py-3 font-black uppercase text-xl shadow-lg">
               Order Records
            </div>
         </div>

         <div className="bg-white border-4 border-gray-400 shadow-2xl overflow-hidden p-1">
            <table className="w-full border-collapse">
               <thead>
                  <tr>
                     <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-left">Vendor Details</th>
                     <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-left">Items Purchased</th>
                     <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-center">Amount</th>
                     <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-center">Progress Status</th>
                  </tr>
               </thead>
               <tbody>
                  {orders.length === 0 ? (
                     <tr>
                        <td colSpan={4} className="p-24 text-center text-gray-400 font-black uppercase tracking-[0.2em] bg-slate-50">
                           <span className="text-4xl block mb-2 opacity-50">📋</span>
                           Empty Log
                        </td>
                     </tr>
                  ) : (
                     orders.map(o => (
                        <tr key={o.id} className="bg-[#dbeafe] hover:bg-blue-100 transition-colors group">
                           <td className="border-2 border-white p-6 align-top">
                              <div className="flex flex-col gap-1">
                                 <span className="bg-[#4f81c7] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-tighter w-fit mb-1">VENDOR</span>
                                 <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{o.vendorName || 'Catering Services'}</span>
                                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ORDER #{o.id.slice(-6).toUpperCase()}</span>
                              </div>
                           </td>
                           <td className="border-2 border-white p-6 align-top">
                              <div className="flex flex-col gap-1">
                                 {o.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="flex gap-2 text-[11px] font-bold text-slate-600 uppercase">
                                       <span className="text-[#4f81c7]">•</span>
                                       <span>{item.name} <span className="text-slate-400">({item.quantity})</span></span>
                                    </div>
                                 ))}
                              </div>
                           </td>
                           <td className="border-2 border-white p-6 text-center align-top">
                              <span className="text-sm font-black text-slate-900 bg-white px-3 py-1 border border-gray-300 shadow-inner">
                                 Rs {o.totalAmount}/-
                              </span>
                           </td>
                           <td className="border-2 border-white p-6 text-center align-middle">
                              <div className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm border-2 inline-block ${
                                 o.status === 'Received' ? 'bg-yellow-500 text-white border-yellow-600' :
                                 o.status === 'Ready for Shipping' ? 'bg-blue-500 text-white border-blue-600' :
                                 'bg-[#558844] text-white border-[#457038]'
                              }`}>
                                 {o.status}
                              </div>
                           </td>
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
         </div>

         <div className="flex justify-center mt-8">
            <div className="bg-white border-2 border-gray-400 px-12 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center shadow">
               All orders are subject to the service policy of the individual vendor.
            </div>
         </div>
      </div>
    </div>
  )
}
