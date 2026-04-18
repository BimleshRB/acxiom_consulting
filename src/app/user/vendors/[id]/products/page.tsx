"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { getVendorDetailsAction } from "@/actions/user"
import { getVendorProductsAction } from "@/actions/vendor"

export default function VendorProducts() {
  const { id } = useParams()
  const vendorId = id as string
  
  const { addToCart } = useStore()
  
  const [vendor, setVendor] = React.useState<any>(null)
  const [products, setProducts] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    Promise.all([
      getVendorDetailsAction(vendorId),
      getVendorProductsAction(vendorId)
    ]).then(([vRes, pRes]) => {
      if (vRes.success && vRes.data) setVendor(vRes.data)
      if (pRes.success && pRes.data) setProducts(pRes.data)
      setLoading(false)
    })
  }, [vendorId])

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
           <Link href="/user/dashboard" className="bg-white border-2 border-gray-400 px-8 py-2 font-black uppercase text-[10px] shadow hover:bg-gray-50 transition-colors">
              ← Main Dashboard
           </Link>
           <h1 className="bg-white border-4 border-gray-400 px-12 py-3 font-black uppercase text-2xl shadow-xl tracking-tighter">
              {vendor?.name || 'Vendor Portfolio'}
           </h1>
           <div className="w-24 invisible">Spacer</div>
        </div>

        <div className="bg-[#4f81c7] text-white px-8 py-2 border-2 border-black font-black uppercase text-xs shadow-[4px_4px_0_0_rgba(0,0,0,1)] w-fit mx-auto lg:mx-0">
           Product Inventory
        </div>

        <div className="flex flex-wrap gap-10 justify-center lg:justify-start pb-20">
          {loading ? (
             <div className="bg-white border-2 border-dashed border-gray-400 p-20 text-center font-black uppercase text-[#4f81c7] tracking-widest animate-pulse w-full">
                --- SYNCHRONIZING PRODUCT CATALOG ---
             </div>
          ) : products.length === 0 ? (
             <div className="bg-white border-2 border-dashed border-gray-400 p-20 text-center font-black uppercase text-gray-400 tracking-widest w-full">
                --- No Products Registered for this Vendor ---
             </div>
          ) : (
            products.map(p => (
              <div key={p.id} className="bg-white border-4 border-gray-400 w-64 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] transition-all flex flex-col items-center">
                 <div className="bg-[#4f81c7] w-full p-3 border-b-4 border-black text-center">
                    <span className="text-white font-black uppercase text-xs tracking-tighter truncate block">{p.name}</span>
                 </div>
                 
                 <div className="p-8 flex flex-col items-center gap-6 w-full">
                    <div className="w-full h-32 bg-gray-50 border-2 border-gray-200 flex items-center justify-center p-2 overflow-hidden">
                       {p.imageUrl ? (
                         <img src={p.imageUrl} alt={p.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                       ) : (
                         <div className="text-[10px] font-black text-gray-300 uppercase italic">-- No Media --</div>
                       )}
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rate / Price</p>
                      <p className="text-xl font-black text-slate-900">Rs {p.price}/-</p>
                    </div>

                    <button 
                      onClick={() => addToCart({...p, productId: p.id, quantity: 1})} 
                      className="w-full bg-[#4f81c7] hover:bg-[#3460C0] text-white py-3 border-2 border-black font-black uppercase text-[10px] text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                    >
                      Add to Registry
                    </button>
                 </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
