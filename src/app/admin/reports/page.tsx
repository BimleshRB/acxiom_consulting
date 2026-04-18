"use client"

import * as React from "react"
import Link from "next/link"
import { getAdminReportsAction } from "@/actions/reports"

export default function AdminReports() {
  const [data, setData] = React.useState<any>(null)

  React.useEffect(() => {
    getAdminReportsAction().then(setData)
  }, [])

  if (!data) return <div className="p-20 text-center font-black uppercase text-gray-400">Loading System Metrics...</div>

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
           <h1 className="bg-white border-4 border-gray-400 px-12 py-3 font-black uppercase text-2xl shadow-xl tracking-tighter">System Analytics & Reports</h1>
           <Link href="/admin/dashboard" className="bg-[#4f81c7] text-white px-8 py-2 border-2 border-white font-black uppercase text-[10px] shadow hover:bg-[#3460C0] transition-colors">
              ← Dashboard
           </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Users', value: data.stats.users, color: 'border-blue-500' },
             { label: 'Registered Vendors', value: data.stats.vendors, color: 'border-green-500' },
             { label: 'Total Transactions', value: data.stats.orders, color: 'border-yellow-500' },
             { label: 'Gross Revenue', value: `Rs ${data.stats.revenue}`, color: 'border-purple-500' }
           ].map(stat => (
             <div key={stat.label} className={`bg-white border-b-8 ${stat.color} p-6 shadow-lg flex flex-col items-center justify-center gap-2`}>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</span>
                <span className="text-3xl font-black text-slate-800">{stat.value}</span>
             </div>
           ))}
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white border-4 border-gray-400 p-1 shadow-2xl">
           <div className="bg-[#4f81c7] text-white p-4 font-black uppercase text-xs tracking-widest border-b-2 border-black mb-1">
              Recent Transaction Log
           </div>
           <table className="w-full border-collapse">
              <thead>
                 <tr>
                    <th className="bg-gray-100 border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-left">Customer</th>
                    <th className="bg-gray-100 border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-left">Vendor</th>
                    <th className="bg-gray-100 border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-center">Amount</th>
                    <th className="bg-gray-100 border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-center">Date</th>
                 </tr>
              </thead>
              <tbody>
                 {data.recentOrders.map((o: any) => (
                    <tr key={o.id} className="bg-[#dbeafe] hover:bg-blue-100 transition-colors">
                       <td className="border-2 border-white p-4 font-black uppercase text-xs text-slate-700">{o.userName}</td>
                       <td className="border-2 border-white p-4 font-black uppercase text-xs text-slate-700">{o.vendorName}</td>
                       <td className="border-2 border-white p-4 text-center font-black text-slate-900 italic">Rs {o.amount}/-</td>
                       <td className="border-2 border-white p-4 text-center text-[10px] font-bold text-gray-400">
                          {new Date(o.date).toLocaleDateString()}
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  )
}
