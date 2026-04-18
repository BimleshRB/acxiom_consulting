"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { getVendorsByCategoryAction } from "@/actions/user"

export default function VendorsList() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  
  const [vendors, setVendors] = React.useState<any[]>([])

  React.useEffect(() => {
    getVendorsByCategoryAction(category).then(setVendors)
  }, [category])

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/user/dashboard" className="bg-white border border-[#a0a0a0] px-6 py-1 text-black font-medium">Home</Link>
      </div>

      <div className="flex flex-wrap gap-12 justify-center mt-16 max-w-4xl mx-auto">
        {vendors.length === 0 ? (
           <div className="font-bold text-gray-500">No Vendors Found</div>
        ) : (
          vendors.map((v, i) => (
            <div key={v.id} className="bg-[#4f81c7] text-white rounded-2xl w-48 h-48 flex flex-col items-center justify-between p-4 shadow-sm border border-gray-400">
               <div className="font-medium mt-2">{v.name}</div>
               <div className="text-sm">Contact Details</div>
               <Link href={`/user/vendors/${v.id}/products`} className="bg-white text-black px-6 py-1 border border-gray-400 shadow-sm text-sm hover:bg-gray-100">
                 Shop Item
               </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
