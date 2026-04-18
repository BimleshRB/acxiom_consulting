"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useStore } from "@/lib/store"
import { getVendorProductsAction, deleteProductAction } from "@/actions/vendor"

export default function VendorItems() {
  const pathname = usePathname()
  const { currentUser } = useStore()
  const [products, setProducts] = React.useState<any[]>([])

  React.useEffect(() => {
    if (currentUser?.id) {
      getVendorProductsAction(currentUser.id).then(setProducts)
    }
  }, [currentUser])

  const handleDelete = async (id: string) => {
    await deleteProductAction(id)
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-[#4f81c7] flex p-4 gap-4 shadow-sm items-center">
        <Link href="/vendor/items" className={`border-2 border-white px-6 py-2 font-black uppercase text-xs shadow-md transition-all ${
          pathname === '/vendor/items' ? 'bg-white text-[#4f81c7]' : 'bg-[#4f81c7] text-white hover:bg-[#3460C0]'
        }`}>
           Product Status
        </Link>
        <Link href="/vendor/requests" className="bg-white border-2 border-[#a0a0a0] px-6 py-2 text-black font-black uppercase text-xs shadow-md hover:bg-gray-50 transition-all">
           Request Item
        </Link>
        <Link href={`/user/vendors/${currentUser?.id}/products`} className="bg-white border-2 border-[#a0a0a0] px-6 py-2 text-black font-black uppercase text-xs shadow-md hover:bg-gray-50 transition-all">
           View Product
        </Link>
        <div className="flex-1"></div>
        <Link href="/vendor/items/add" className="bg-[#558844] text-white px-8 py-2 border-2 border-white font-black uppercase text-xs shadow-lg hover:bg-[#457038] transition-all transform hover:scale-105">
           + Add New Item
        </Link>
      </div>

      <div className="p-8">
        <div className="bg-white border-4 border-gray-400 p-1 shadow-2xl">
           <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-sm tracking-widest font-black">Product Image</th>
                  <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-sm tracking-widest font-black">Product Name</th>
                  <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-sm tracking-widest font-black">Product Price</th>
                  <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-sm tracking-widest font-black">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-400 font-bold uppercase bg-gray-50">No items found</td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.id} className="bg-[#dbeafe] hover:bg-blue-100 transition-colors">
                      <td className="border-2 border-white p-2">
                         <div className="w-full h-24 flex items-center justify-center bg-[#4f81c7]/10 overflow-hidden">
                           {p.imageUrl ? (
                             <img src={p.imageUrl} alt={p.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                           ) : (
                             <span className="text-[10px] font-bold text-gray-400">NO IMAGE</span>
                           )}
                         </div>
                      </td>
                      <td className="border-2 border-white p-4 text-center font-bold text-slate-800 uppercase tracking-tight">
                        {p.name}
                      </td>
                      <td className="border-2 border-white p-4 text-center font-black text-slate-900">
                        Rs {p.price}/-
                      </td>
                      <td className="border-2 border-white p-2">
                        <div className="flex flex-col gap-1 items-center justify-center h-full">
                           <button 
                             onClick={() => handleDelete(p.id)} 
                             className="w-full bg-[#4f81c7] text-white py-1.5 text-[10px] font-black uppercase hover:bg-red-600 transition-colors border border-black shadow-sm"
                           >
                             Delete
                           </button>
                           <button 
                             className="w-full bg-[#4f81c7] text-white py-1.5 text-[10px] font-black uppercase hover:bg-blue-600 transition-colors border border-black shadow-sm"
                           >
                             Update
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
  )
}
