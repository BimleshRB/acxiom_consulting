"use client"
import Link from 'next/link'

export default function IndexPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 py-12 px-4">
      
      <div className="w-full max-w-[600px] bg-[#d3d3d3] border border-gray-400 p-12 shadow-md flex flex-col items-center">
        
        {/* START circle from PDF */}
        <div className="mb-12">
          <div className="w-28 h-28 rounded-full border-4 border-[#558844] flex items-center justify-center p-2 bg-white shadow-sm ring-8 ring-[#558844]/10">
             <span className="text-[#558844] font-bold text-lg tracking-wider">START</span>
          </div>
        </div>

        <div className="w-full max-w-[400px] flex flex-col items-center">
           {/* Boxy flowchart style */}
           <div className="bg-[#4f81c7] text-white w-full text-center py-3 font-bold shadow-sm border border-[#3d6cae]">
              EVENT MANAGEMENT SYSTEM
           </div>
           
           <div className="w-1 h-8 bg-gray-400"></div>

           <div className="bg-white border-2 border-gray-400 w-48 text-center py-2 text-sm font-bold text-black shadow-sm">
              LOGIN
           </div>
           
           <div className="w-1 h-8 bg-gray-400"></div>
           
           <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link href="/login/vendor" className="bg-white border-2 border-[#4f81c7] flex-1 text-center py-3 text-sm font-bold text-black hover:bg-blue-50 transition-colors shadow-sm uppercase tracking-tight">
                 Vendor
              </Link>
              <Link href="/login/admin" className="bg-white border-2 border-[#4f81c7] flex-1 text-center py-3 text-sm font-bold text-black hover:bg-blue-50 transition-colors shadow-sm uppercase tracking-tight">
                 Admin
              </Link>
              <Link href="/login/user" className="bg-white border-2 border-[#4f81c7] flex-1 text-center py-3 text-sm font-bold text-black hover:bg-blue-50 transition-colors shadow-sm uppercase tracking-tight">
                 User
              </Link>
           </div>
        </div>
      </div>
    </div>
  )
}
