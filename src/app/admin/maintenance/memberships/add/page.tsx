"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { getUsersAction, addMembershipAction } from "@/actions/admin"

export default function AddMembership() {
  const router = useRouter()
  const [vendors, setVendors] = React.useState<any[]>([])
  const [selectedVendor, setSelectedVendor] = React.useState("")
  const [duration, setDuration] = React.useState<any>("6 months")
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<any>(null)

  React.useEffect(() => {
    getUsersAction('vendor').then(setVendors)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedVendor) return alert("Please select a vendor")
    
    setLoading(true)
    const res = await addMembershipAction(selectedVendor, duration)
    setLoading(false)
    
    if (res.success) {
      setResult(res)
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-xl">
        <div className="bg-white border-4 border-gray-400 p-8 shadow-2xl">
           <div className="bg-[#4f81c7] text-white p-4 mb-8 border-b-4 border-black font-black uppercase tracking-widest text-center">
              Register New Membership
           </div>

           {result ? (
             <div className="bg-[#558844] text-white p-6 border-4 border-black shadow-inner mb-8 text-center animate-in zoom-in duration-300">
                <p className="font-black text-xl mb-2">ENTRY SUCCESSFUL!</p>
                <div className="bg-white text-black p-4 inline-block font-black border-2 border-black mb-4">
                   MEMBERSHIP NO: {result.membershipNumber}
                </div>
                <button onClick={() => router.push('/admin/maintenance/memberships')} className="block mx-auto underline text-xs font-bold uppercase">Back to Menu</button>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col gap-2">
                   <label className="text-black font-black uppercase text-xs tracking-widest border-l-4 border-[#4f81c7] pl-2">Select Vendor Account</label>
                   <select 
                     value={selectedVendor} 
                     onChange={(e) => setSelectedVendor(e.target.value)}
                     className="w-full border-2 border-gray-300 p-3 bg-gray-50 font-bold text-sm outline-none focus:border-[#4f81c7] transition-colors"
                     required
                   >
                     <option value="">-- Choose Vendor Member --</option>
                     {vendors.map(v => <option key={v.id} value={v.id}>{v.name} ({v.email})</option>)}
                   </select>
                </div>

                <div className="flex flex-col gap-4">
                   <label className="text-black font-black uppercase text-xs tracking-widest border-l-4 border-[#4f81c7] pl-2">Subscription Package</label>
                   <div className="grid grid-cols-1 gap-2">
                      {[
                        { label: '6 Months (Recommended)', value: '6 months' },
                        { label: '1 Year Plan', value: '1 year' },
                        { label: '2 Year Extended', value: '2 years' }
                      ].map(option => (
                        <label key={option.value} className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${duration === option.value ? 'bg-blue-50 border-[#4f81c7] shadow-inner' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                           <input 
                             type="radio" 
                             name="duration" 
                             value={option.value} 
                             checked={duration === option.value}
                             onChange={() => setDuration(option.value)}
                             className="w-5 h-5 accent-[#4f81c7]"
                           />
                           <span className="font-black uppercase text-xs tracking-tight text-slate-700">{option.label}</span>
                        </label>
                      ))}
                   </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                   <button type="button" onClick={() => router.back()} className="text-gray-400 font-bold uppercase text-[10px] hover:text-black">Cancel</button>
                   <button 
                     type="submit" 
                     disabled={loading}
                     className="bg-[#4f81c7] hover:bg-[#3460C0] text-white px-10 py-3 font-black uppercase text-xs shadow-xl border-b-4 border-black disabled:opacity-50"
                   >
                      {loading ? 'Processing...' : 'Generate Certificate'}
                   </button>
                </div>
             </form>
           )}
        </div>
      </div>
    </div>
  )
}
