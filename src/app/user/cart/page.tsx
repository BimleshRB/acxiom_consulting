"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"

export default function UserCart() {
  const router = useRouter()
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore()
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="flex gap-4 max-w-4xl mx-auto mb-10">
        <Link href="/user/vendors" className="bg-white border-2 border-gray-400 px-6 py-2 text-black font-black uppercase text-xs shadow-md hover:bg-gray-100 italic tracking-tighter">
           ← View More Products
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white border-4 border-gray-400 shadow-2xl relative">
          <div className="bg-[#BDE0F6] w-full py-4 px-8 border-b-4 border-gray-400 flex justify-between items-center">
             <span className="font-black uppercase tracking-widest text-lg text-slate-800">Shopping Cart</span>
             <span className="bg-[#4f81c7] text-white px-4 py-1 text-xs font-bold shadow-inner">ITEM COUNT: {cart.length}</span>
          </div>

          <div className="p-4">
             <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-wider">Quantity</th>
                    <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-wider text-left">Product Name</th>
                    <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-wider">Total Price</th>
                    <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-20 text-center text-gray-400 font-black uppercase tracking-widest text-xl bg-slate-50">
                         Cart is Empty
                      </td>
                    </tr>
                  ) : (
                    <>
                      {cart.map(c => (
                        <tr key={c.productId} className="bg-[#dbeafe] hover:bg-blue-100 transition-colors">
                          <td className="border-2 border-white p-4">
                             <div className="flex justify-center">
                                <select 
                                  value={c.quantity}
                                  onChange={(e) => updateCartQuantity(c.productId, parseInt(e.target.value))}
                                  className="bg-[#4f81c7] text-white font-black px-4 py-1.5 border border-black shadow outline-none text-xs"
                                >
                                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n} className="text-black bg-white">{n}</option>)}
                                </select>
                             </div>
                          </td>
                          <td className="border-2 border-white p-4 font-black uppercase text-sm text-slate-700 tracking-tight">
                            {c.name}
                          </td>
                          <td className="border-2 border-white p-4 text-center font-black text-slate-900">
                             Rs {(c.price * c.quantity).toFixed(2)}/-
                          </td>
                          <td className="border-2 border-white p-4">
                             <div className="flex justify-center">
                                <button 
                                  onClick={() => removeFromCart(c.productId)} 
                                  className="bg-red-500 hover:bg-red-600 text-white font-black px-6 py-1.5 text-[10px] uppercase border border-black shadow transition-all"
                                >
                                  Remove
                                </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                      
                      {/* Total Bar */}
                      <tr className="bg-[#4f81c7]">
                        <td colSpan={2} className="p-4 text-white font-black text-xl uppercase tracking-widest text-right pr-12">
                           Grand Total
                        </td>
                        <td className="p-4 text-white font-black text-xl text-center border-l-2 border-white">
                           Rs {total.toFixed(2)}/-
                        </td>
                        <td className="p-4 flex justify-center sticky right-0">
                           <button onClick={() => clearCart()} className="bg-white text-red-600 px-6 py-2 border border-black shadow font-black text-[10px] uppercase hover:bg-red-50">
                             Delete All
                           </button>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
             </table>
          </div>

          <div className="p-8 flex justify-end">
             <button 
               onClick={() => router.push('/user/checkout')} 
               disabled={cart.length === 0} 
               className="bg-[#4f81c7] hover:bg-[#3460C0] text-white px-12 py-4 font-black uppercase text-lg shadow-xl border-4 border-[#3460C0] disabled:opacity-50 disabled:grayscale transition-all transform hover:translate-y-[-2px] active:translate-y-[1px]"
             >
                Proceed to CheckOut →
             </button>
          </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-6 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
         Confirm your products before proceeding to secure payment.
      </div>
    </div>
  )
}
