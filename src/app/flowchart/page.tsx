"use client"

import Link from "next/link"

export default function FlowChartPage() {
  return (
    <div className="bg-white min-h-screen p-12 font-mono text-black">
      <div className="max-w-4xl mx-auto border-4 border-black p-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-12 border-b-4 border-black pb-4">
          <h1 className="text-4xl font-black uppercase tracking-tighter">System Blueprint</h1>
          <Link href="/" className="bg-black text-white px-6 py-2 font-bold uppercase text-xs hover:invert">← Close</Link>
        </div>

        <div className="space-y-8">
          <div className="border-2 border-dashed border-gray-400 p-8 text-center bg-gray-50 uppercase font-black text-xl italic tracking-widest">
             [ LOGICAL FLOW ARCHITECTURE ]
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h2 className="bg-[#4f81c7] text-white px-3 py-1 inline-block font-black text-sm uppercase">1. Vendor Node</h2>
              <ul className="text-xs font-bold leading-loose space-y-1">
                <li>• PRODUCT STATUS (Inventory)</li>
                <li>• ADD NEW ITEM (Forms)</li>
                <li>• REQUEST ITEM (Active Orders)</li>
                <li>• USER REQUESTS (Transactions)</li>
                <li>• VIEW PRODUCT (Preview)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="bg-green-600 text-white px-3 py-1 inline-block font-black text-sm uppercase">2. Admin Node</h2>
              <ul className="text-xs font-bold leading-loose space-y-1">
                <li>• MAINTENANCE MENU (Restricted)</li>
                <li>• ADD/UPDATE MEMBERSHIPS</li>
                <li>• USER/VENDOR MANAGEMENT</li>
                <li>• SYSTEM REPORTS (Metrics)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="bg-yellow-500 text-white px-3 py-1 inline-block font-black text-sm uppercase">3. User Node</h2>
              <ul className="text-xs font-bold leading-loose space-y-1">
                <li>• VENDOR BROWSE</li>
                <li>• SHOPPING CART & PAYMENT</li>
                <li>• GUEST LIST (CRUD)</li>
                <li>• ORDER STATUS (Check)</li>
                <li>• PERSONAL REPORTS</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-black flex flex-col gap-2">
             <div className="text-[10px] font-bold text-gray-500 uppercase">Interactive Navigation Rules:</div>
             <div className="bg-yellow-50 p-4 border-2 border-yellow-200 text-xs font-medium text-yellow-800">
                - Radio Buttons: Mutually Exclusive Selection.<br/>
                - Checkboxes: Binary State Agreement.<br/>
                - Hidden Passwords: Entry Obfuscation Mandatory.<br/>
                - Mandatory Validation: Completion Required for Execution.
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
