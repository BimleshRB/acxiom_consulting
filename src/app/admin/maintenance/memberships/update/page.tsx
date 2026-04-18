"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { getMembershipByNumberAction, updateMembershipStatusAction } from "@/actions/admin"

export default function UpdateMembership() {
  const router = useRouter()
  const [membershipNo, setMembershipNo] = React.useState("")
  const [membership, setMembership] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)
  const [extension, setExtension] = React.useState("6 months")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!membershipNo) return
    
    setLoading(true)
    const res = await getMembershipByNumberAction(membershipNo)
    setLoading(false)
    
    if (res) {
      setMembership(res)
    } else {
      alert("Membership number not found in system.")
    }
  }

  const handleAction = async (type: 'extend' | 'cancel') => {
    if (!confirm(`Are you sure you want to ${type} this membership?`)) return
    
    setLoading(true)
    const res = await updateMembershipStatusAction(membershipNo, type, extension)
    setLoading(false)
    
    if (res.success) {
      alert(`Membership successfully ${type}ed!`)
      setMembership(null)
      setMembershipNo("")
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white border-4 border-gray-400 p-8 shadow-2xl relative overflow-hidden">
           <div className="bg-[#4f81c7] text-white p-4 mb-8 border-b-4 border-black font-black uppercase tracking-widest text-center">
              Maintain / Update Record
           </div>

           <form onSubmit={handleSearch} className="mb-12">
              <div className="flex flex-col gap-2">
                 <label className="text-black font-black uppercase text-[10px] tracking-widest pl-2">Enter Membership Identification No.</label>
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={membershipNo}
                      onChange={(e) => setMembershipNo(e.target.value.toUpperCase())}
                      placeholder="E.G. MEM123456"
                      className="flex-1 border-2 border-gray-400 p-3 bg-gray-50 font-black text-sm outline-none uppercase"
                      required
                    />
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="bg-[#4f81c7] text-white px-8 font-black uppercase text-xs border-b-4 border-black hover:bg-[#3460C0] active:translate-y-1 transition-all"
                    >
                       Search
                    </button>
                 </div>
              </div>
           </form>

           {membership && (
             <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                <div className="bg-[#BDE0F6] p-6 border-2 border-dashed border-blue-400 flex flex-col gap-3">
                   <div className="flex justify-between items-start">
                      <div>
                         <p className="text-[10px] font-bold text-blue-600 uppercase">Vendor Name</p>
                         <p className="font-black uppercase text-xl text-slate-800">{membership.vendorName}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-bold text-blue-600 uppercase">Status</p>
                         <p className={`font-black uppercase text-sm ${membership.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {membership.isActive ? 'ACTIVE ✓' : 'INACTIVE ✖'}
                         </p>
                      </div>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-blue-600 uppercase">Current Expiry Date</p>
                      <p className="font-black text-slate-700">{new Date(membership.expiresAt).toLocaleDateString()}</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-gray-200">
                   {/* Extend Logic */}
                   <div className="space-y-4">
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Extension Options</p>
                      <select 
                        value={extension}
                        onChange={(e) => setExtension(e.target.value)}
                        className="w-full border-2 border-gray-300 p-2 font-bold text-xs uppercase bg-white outline-none"
                      >
                         <option value="6 months">Add 6 Months</option>
                         <option value="1 year">Add 1 Year</option>
                         <option value="2 years">Add 2 Years</option>
                      </select>
                      <button 
                        onClick={() => handleAction('extend')}
                        className="w-full bg-[#558844] text-white py-3 font-black uppercase text-xs border-b-4 border-black hover:bg-[#457038]"
                      >
                         Apply Extension
                      </button>
                   </div>

                   {/* Cancel Logic */}
                   <div className="space-y-4">
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Account Control</p>
                      <div className="bg-gray-50 p-2 text-[10px] font-medium text-gray-500 uppercase leading-tight italic">
                         Permanently rescind vendor benefits and access levels.
                      </div>
                      <button 
                        onClick={() => handleAction('cancel')}
                        className="w-full bg-red-600 text-white py-3 font-black uppercase text-xs border-b-4 border-black hover:bg-red-700"
                      >
                         Cancel Membership
                      </button>
                   </div>
                </div>
             </div>
           )}

           <div className="mt-12 flex justify-center">
              <button 
                onClick={() => router.push('/admin/maintenance/memberships')}
                className="text-gray-400 font-bold uppercase text-[10px] hover:text-[#4f81c7] transition-colors"
              >
                 ← Return to Records Menu
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}
