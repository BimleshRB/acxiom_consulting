"use client"

import * as React from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { getUserReportsAction } from "@/actions/reports"

export default function UserReports() {
  const { currentUser } = useStore()
  const [reports, setReports] = React.useState<any[]>([])

  const [error, setError] = React.useState("")

  React.useEffect(() => {
    if (currentUser?.id) {
      getUserReportsAction(currentUser.id).then(res => {
        if (res.success && res.data) {
          setReports(res.data)
        } else if (!res.success) {
          setError(res.error || "Failed to load reports")
        }
      })
    }
  }, [currentUser])

  return (
    <div className="bg-gray-200 min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex justify-between items-center">
           <h1 className="bg-white border-4 border-gray-400 px-12 py-3 font-black uppercase text-2xl shadow-xl tracking-tighter">My Transaction Report</h1>
           <Link href="/user/dashboard" className="bg-[#4f81c7] text-white px-8 py-2 border-2 border-white font-black uppercase text-[10px] shadow hover:bg-[#3460C0] transition-colors">
              ← Dashboard
           </Link>
        </div>

        <div className="bg-white border-4 border-gray-400 p-1 shadow-2xl">
           <div className="bg-[#4f81c7] text-white p-4 font-black uppercase text-xs tracking-widest border-b-2 border-black mb-1">
              Personal Order History
           </div>
           <table className="w-full border-collapse">
              <thead>
                 <tr>
                    <th className="bg-gray-100 border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-left">Vendor Details</th>
                    <th className="bg-gray-100 border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-center">Total Paid</th>
                    <th className="bg-gray-100 border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-center">Current Status</th>
                    <th className="bg-gray-100 border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-center">Date</th>
                 </tr>
              </thead>
              <tbody>
                 {error ? (
                    <tr>
                       <td colSpan={4} className="p-20 text-center font-black uppercase text-red-400 italic bg-red-50 border-2 border-red-200">System Error: {error}</td>
                    </tr>
                 ) : reports.length === 0 ? (
                    <tr>
                       <td colSpan={4} className="p-20 text-center font-black uppercase text-gray-300 italic bg-gray-50">No transaction records found</td>
                    </tr>
                 ) : (
                    reports.map(r => (
                       <tr key={r.id} className="bg-[#dbeafe] hover:bg-blue-100 transition-colors">
                          <td className="border-2 border-white p-6 align-top">
                             <div className="flex flex-col">
                                <span className="font-black uppercase text-xs text-slate-800 tracking-tight">{r.vendorName}</span>
                                <span className="text-[10px] font-bold text-slate-400">Order ID: #{r.id.slice(-6).toUpperCase()}</span>
                             </div>
                          </td>
                          <td className="border-2 border-white p-6 text-center align-middle font-black text-slate-900">
                             Rs {r.amount}/-
                          </td>
                          <td className="border-2 border-white p-6 text-center align-middle">
                             <span className={`px-4 py-1.5 text-[10px] font-black uppercase border-2 shadow-inner inline-block ${
                                r.status === 'Received' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                r.status === 'Ready for Shipping' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                'bg-green-100 text-green-700 border-green-200'
                             }`}>
                                {r.status}
                             </span>
                          </td>
                          <td className="border-2 border-white p-6 text-center align-middle text-[10px] font-bold text-gray-400 lowercase italic">
                             {new Date(r.date).toLocaleDateString()}
                          </td>
                       </tr>
                    ))
                 )}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  )
}
