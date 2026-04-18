"use client"

import * as React from "react"
import { getUsersAction, deleteUserAction } from "@/actions/admin"

export default function AdminUsers() {
  const [users, setUsers] = React.useState<any[]>([])

  React.useEffect(() => {
    Promise.all([
      getUsersAction('user'),
      getUsersAction('vendor')
    ]).then(([u, v]) => {
      const combined = []
      if (u.success && u.data) combined.push(...u.data)
      if (v.success && v.data) combined.push(...v.data)
      setUsers(combined)
    })
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUserAction(id)
      setUsers(users.filter(u => u.id !== id))
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#BDE0F6] border-4 border-gray-400 p-8 shadow-2xl relative">
           <div className="flex justify-between items-center mb-8 border-b-2 border-gray-400 pb-4">
              <h2 className="text-black font-black uppercase tracking-tighter text-2xl">Manage Users & Vendors</h2>
              <span className="bg-[#4f81c7] text-white px-4 py-1 text-[10px] font-bold shadow-inner uppercase tracking-widest">System Registry</span>
           </div>
           
           <div className="bg-white p-1 border-2 border-gray-400 shadow-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-widest text-left">Account Name</th>
                    <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-widest text-center">Identity</th>
                    <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-widest text-left">Contact Email</th>
                    <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-widest text-center">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-white">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-gray-400 font-bold uppercase tracking-widest italic bg-slate-50">Fetching account records...</td>
                    </tr>
                  ) : (
                    users.map(u => (
                      <tr key={u.id} className="bg-[#dbeafe] hover:bg-blue-100 transition-colors group">
                        <td className="border-2 border-white p-4 text-sm font-black text-slate-800 uppercase tracking-tight">{u.name}</td>
                        <td className="border-2 border-white p-4 text-center">
                           <span className={`inline-block px-4 py-1 text-[10px] font-black uppercase shadow-inner ${u.role === 'vendor' ? 'bg-[#558844] text-white' : 'bg-gray-400 text-black'}`}>
                              {u.role}
                           </span>
                        </td>
                        <td className="border-2 border-white p-4 text-xs font-bold text-slate-500 break-all">{u.email}</td>
                        <td className="border-2 border-white p-2">
                          <div className="flex justify-center">
                             <button 
                               onClick={() => handleDelete(u.id)} 
                               className="bg-red-500 hover:bg-red-600 text-white font-black px-4 py-1.5 text-[9px] uppercase border border-black shadow-sm transition-all grayscale hover:grayscale-0"
                             >
                               Remove Access
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  )
}
