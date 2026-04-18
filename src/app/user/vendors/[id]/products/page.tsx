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

  React.useEffect(() => {
    getVendorDetailsAction(vendorId).then(res => {
      if (res.success && res.data) setVendor(res.data)
    })
    getVendorProductsAction(vendorId).then(res => {
      if (res.success && res.data) setProducts(res.data)
    })
  }, [vendorId])

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
        <Link href="/user/dashboard" className="bg-white border border-[#a0a0a0] px-6 py-1 text-black font-medium">Home</Link>
        <div className="bg-[#4f81c7] text-white border border-[#a0a0a0] px-8 py-1 shadow-sm font-medium">
           {vendor?.name || 'Vendor Name'}
        </div>
        <div className="bg-[#4f81c7] text-white border border-[#a0a0a0] px-8 py-1 shadow-sm font-medium invisible">
           Placeholder
        </div>
      </div>

      <div className="flex gap-4 max-w-5xl mx-auto mb-8">
        <div className="bg-[#4f81c7] text-white border border-[#a0a0a0] px-8 py-1 shadow-sm font-medium text-lg w-48 text-center">Products</div>
      </div>

      <div className="flex flex-wrap gap-8 justify-center max-w-5xl mx-auto">
        {products.length === 0 ? (
           <div className="font-bold text-gray-500">No Products Found</div>
        ) : (
          products.map(p => (
            <div key={p.id} className="bg-[#4f81c7] text-white rounded-2xl w-48 h-48 flex flex-col items-center justify-between p-4 shadow-sm border border-gray-400">
               <div className="font-medium mt-2">{p.name}</div>
               <div className="text-sm">Price: ${p.price}</div>
               <button onClick={() => addToCart({...p, productId: p.id, quantity: 1})} className="bg-white text-black px-6 py-1 border border-gray-400 shadow-sm text-sm hover:bg-gray-100">
                 Add to Cart
               </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
