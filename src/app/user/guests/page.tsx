"use client"

import * as React from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { getGuestsAction, addGuestAction, updateGuestAction, deleteGuestAction } from "@/actions/guest"

export default function GuestList() {
  const { currentUser } = useStore()
  const [guests, setGuests] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)
  const [newGuest, setNewGuest] = React.useState({ name: '', email: '', phone: '', status: 'Invited' })
  const [editingId, setEditingId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (currentUser?.id) {
      loadGuests()
    }
  }, [currentUser])

  const loadGuests = async () => {
    if (!currentUser?.id) return
    const res = await getGuestsAction(currentUser.id)
    if (res.success && res.data) {
      setGuests(res.data)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser?.id) return
    setLoading(true)
    await addGuestAction(currentUser.id, newGuest)
    setLoading(false)
    setNewGuest({ name: '', email: '', phone: '', status: 'Invited' })
    loadGuests()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this guest?")) return
    await deleteGuestAction(id)
    loadGuests()
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    await updateGuestAction(id, { status: newStatus })
    loadGuests()
  }

  return (
    <div className="bg-gray-200 min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-8">
        <div className="flex justify-between items-center">
           <Link href="/user/dashboard" className="bg-[#4f81c7] text-white px-6 py-2 border-2 border-white font-black uppercase text-[10px] shadow hover:bg-[#3460C0] transition-colors">
              ← Dashboard
           </Link>
           <h1 className="bg-white border-4 border-gray-400 px-12 py-3 font-black uppercase text-2xl shadow-xl tracking-tighter">Event Guest List</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Add Form */}
           <div className="bg-[#BDE0F6] border-4 border-gray-400 p-6 shadow-lg h-fit">
              <h2 className="font-black text-sm uppercase tracking-widest mb-6 border-b-2 border-blue-400 pb-2">Invite New Guest</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                 <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase text-blue-700">Guest Name *</label>
                    <input 
                      type="text" 
                      value={newGuest.name} 
                      onChange={e => setNewGuest({...newGuest, name: e.target.value})}
                      className="w-full border-2 border-gray-400 p-2 font-bold text-xs bg-white focus:border-blue-600 outline-none"
                      required
                    />
                 </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase text-blue-700">Email Address</label>
                    <input 
                      type="email" 
                      value={newGuest.email} 
                      onChange={e => setNewGuest({...newGuest, email: e.target.value})}
                      className="w-full border-2 border-gray-400 p-2 font-bold text-xs bg-white focus:border-blue-600 outline-none"
                    />
                 </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase text-blue-700">Phone No.</label>
                    <input 
                      type="text" 
                      value={newGuest.phone} 
                      onChange={e => setNewGuest({...newGuest, phone: e.target.value})}
                      className="w-full border-2 border-gray-400 p-2 font-bold text-xs bg-white focus:border-blue-600 outline-none"
                    />
                 </div>
                 <button 
                   type="submit" 
                   disabled={loading}
                   className="w-full bg-[#4f81c7] text-white py-3 font-black uppercase text-xs border-b-4 border-black hover:bg-[#3460C0] shadow-md transition-all active:translate-y-1"
                 >
                    {loading ? 'Adding...' : 'Add to Registry'}
                 </button>
              </form>
           </div>

           {/* Guest Table */}
           <div className="lg:col-span-2 bg-white border-4 border-gray-400 p-1 shadow-2xl">
              <table className="w-full border-collapse">
                 <thead>
                    <tr>
                       <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-left">Guest Identity</th>
                       <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-center">RSVP Status</th>
                       <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-[10px] font-black tracking-widest text-center">Operation</th>
                    </tr>
                 </thead>
                 <tbody>
                    {guests.length === 0 ? (
                       <tr>
                          <td colSpan={3} className="p-20 text-center text-gray-300 font-black uppercase tracking-widest bg-slate-50 italic">List Currently Empty</td>
                       </tr>
                    ) : (
                          guests.map(g => (
                          <tr key={g.id} className="bg-[#dbeafe] hover:bg-blue-100 transition-colors">
                             <td className="border-2 border-white p-4">
                                {editingId === g.id ? (
                                   <div className="flex flex-col gap-1">
                                      <input 
                                        type="text" 
                                        defaultValue={g.name}
                                        onBlur={(e) => {
                                          updateGuestAction(g.id, { name: e.target.value })
                                          setEditingId(null)
                                          loadGuests()
                                        }}
                                        className="text-xs font-black uppercase p-1 border border-blue-400"
                                        autoFocus
                                      />
                                      <input 
                                        type="text" 
                                        defaultValue={g.email}
                                        onBlur={(e) => {
                                          updateGuestAction(g.id, { email: e.target.value })
                                          setEditingId(null)
                                          loadGuests()
                                        }}
                                        className="text-[10px] font-bold p-1 border border-blue-300"
                                      />
                                   </div>
                                ) : (
                                   <div className="flex flex-col cursor-pointer" onClick={() => setEditingId(g.id)}>
                                      <span className="font-black uppercase text-xs text-slate-800 tracking-tight">{g.name}</span>
                                      <span className="text-[10px] font-bold text-slate-400">{g.email || 'Click to add email'} | {g.phone || 'Click to add phone'}</span>
                                   </div>
                                )}
                             </td>
                             <td className="border-2 border-white p-4">
                                <div className="flex justify-center">
                                   <select 
                                     value={g.status}
                                     onChange={(e) => handleStatusUpdate(g.id, e.target.value)}
                                     className={`px-3 py-1 text-[10px] font-black uppercase border border-gray-400 shadow-inner bg-white ${
                                       g.status === 'Confirmed' ? 'text-green-600' : 
                                       g.status === 'Declined' ? 'text-red-600' : 'text-blue-600'
                                     }`}
                                   >
                                      <option value="Invited">Invited</option>
                                      <option value="Confirmed">Confirmed</option>
                                      <option value="Declined">Declined</option>
                                   </select>
                                </div>
                             </td>
                             <td className="border-2 border-white p-4">
                                <div className="flex justify-center">
                                   <button 
                                     onClick={() => handleDelete(g.id)}
                                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 font-black uppercase text-[10px] border border-black shadow active:translate-y-px"
                                   >
                                      Delete
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
