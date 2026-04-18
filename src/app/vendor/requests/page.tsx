"use client"

import * as React from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { getVendorOrdersAction, updateOrderStatusAction } from "@/actions/vendor"

export default function VendorRequests() {
  const { currentUser } = useStore()
  const [orders, setOrders] = React.useState<any[]>([])

  React.useEffect(() => {
    if (currentUser?.id) {
      getVendorOrdersAction(currentUser.id).then(setOrders)
    }
  }, [currentUser])

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrderStatusAction(orderId, newStatus)
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-[#4f81c7] flex p-4 gap-4 shadow-sm">
        <Link href="/vendor/items" className="bg-white border border-gray-400 px-6 py-2 text-black font-bold uppercase text-xs shadow-sm hover:bg-gray-50">
           Product Status
        </Link>
        <Link href="/vendor/requests" className="bg-white border border-gray-400 px-6 py-2 text-black font-bold uppercase text-xs shadow-sm hover:bg-gray-50">
           Request Item
        </Link>
        <Link href={`/user/vendors/${currentUser?.id}/products`} className="bg-white border border-gray-400 px-6 py-2 text-black font-bold uppercase text-xs shadow-sm hover:bg-gray-50">
           View Product
        </Link>
      </div>

      <div className="p-8">
        <div className="bg-white border-4 border-gray-400 p-1 shadow-2xl overflow-hidden">
           <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-wider">Customer Details</th>
                  <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-wider">Order Content</th>
                  <th className="bg-[#4f81c7] text-white border-2 border-white p-3 uppercase text-xs font-black tracking-wider">Status Management</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-20 text-center text-gray-400 font-bold uppercase bg-slate-50">No requests found</td>
                  </tr>
                ) : (
                  orders.map(o => (
                    <tr key={o.id} className="bg-[#dbeafe] hover:bg-blue-100 transition-colors">
                      <td className="border-2 border-white p-6 align-top">
                         <div className="flex flex-col gap-2">
                            <div className="bg-[#4f81c7] text-white text-[10px] font-black px-3 py-1 uppercase tracking-tighter self-start mb-1">CUSTOMER</div>
                            <div className="text-sm font-black text-slate-800 uppercase tracking-tight">{o.customerDetails?.name}</div>
                            <div className="text-[11px] font-bold text-slate-500 break-all">{o.customerDetails?.email}</div>
                            <div className="mt-2 pt-2 border-t border-white/50 text-[10px] text-slate-600 font-medium">
                               {o.customerDetails?.address}
                            </div>
                         </div>
                      </td>
                      <td className="border-2 border-white p-6 align-top">
                         <div className="bg-[#4f81c7] text-white text-[10px] font-black px-3 py-1 uppercase tracking-tighter self-start mb-2">SUMMARY</div>
                         <div className="flex flex-col gap-1">
                            {o.items?.map((item: any, idx: number) => (
                               <div key={idx} className="flex justify-between text-xs font-bold text-slate-700 uppercase">
                                  <span>{item.name} x {item.quantity}</span>
                                  <span className="text-slate-500">Rs {item.price * item.quantity}</span>
                               </div>
                            ))}
                            <div className="mt-4 pt-2 border-t-2 border-[#4f81c7] flex justify-between font-black text-sm text-[#4f81c7]">
                               <span>TOTAL</span>
                               <span>Rs {o.totalAmount}/-</span>
                            </div>
                         </div>
                      </td>
                      <td className="border-2 border-white p-6">
                         <div className="bg-white border-2 border-gray-400 p-4 shadow-inner flex flex-col gap-3">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1 text-center">Update Work Progress</span>
                            {['Received', 'Ready for Shipping', 'Out For Delivery'].map(status => (
                              <label key={status} className="flex items-center gap-3 cursor-pointer group hover:bg-blue-50 p-1 transition-colors">
                                <input 
                                  type="radio" 
                                  name={`status-${o.id}`}
                                  value={status}
                                  checked={o.status === status}
                                  onChange={() => handleStatusChange(o.id, status)}
                                  className="w-4 h-4 border-2 border-[#4f81c7] accent-[#4f81c7]"
                                />
                                <span className={`text-[10px] font-black uppercase tracking-tight ${o.status === status ? 'text-[#4f81c7]' : 'text-slate-500'}`}>
                                   {status}
                                </span>
                              </label>
                            ))}
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
