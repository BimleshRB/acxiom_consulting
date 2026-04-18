"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { placeOrderAction } from "@/actions/user"

export default function CheckoutPage() {
  const router = useRouter()
  const { currentUser, cart, clearCart } = useStore()
  
  const [step, setStep] = React.useState(1)
  const [showPopup, setShowPopup] = React.useState(false)

  const [formData, setFormData] = React.useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    address: "",
    city: "",
    number: "",
    paymentMethod: "Cash / UPI",
    state: "",
    pinCode: ""
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser || cart.length === 0) return
    
    setIsSubmitting(true)
    setError("")

    try {
      const vendorItems: Record<string, any[]> = {}
      cart.forEach(c => {
        if (!vendorItems[c.vendorId]) vendorItems[c.vendorId] = []
        vendorItems[c.vendorId].push(c)
      })

      for (const vendorId of Object.keys(vendorItems)) {
        const vItems = vendorItems[vendorId]
        const totalAmount = vItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

        const res = await placeOrderAction({
          userId: currentUser.id,
          vendorId,
          products: vItems.map(i => ({ productId: i.productId, quantity: i.quantity })),
          totalAmount,
          status: 'Received',
          customerDetails: formData
        })

        if (!res.success) {
          throw new Error(res.error || "Order placement failed")
        }
      }

      clearCart()
      setShowPopup(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showPopup) {
    return (
      <div className="fixed inset-0 bg-gray-200/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-md bg-white border-4 border-[#4f81c7] shadow-2xl p-8 flex flex-col items-center animate-in zoom-in duration-300">
           <div className="bg-[#4f81c7] text-white w-full py-2 text-center font-black uppercase tracking-widest mb-8 border-b-4 border-black">
              Order Confirmed
           </div>
           
           <div className="text-4xl mb-4">✅</div>
           <div className="font-black text-xl mb-8 uppercase tracking-tighter">Thank You for your Order</div>
           
           <div className="bg-blue-50 border-2 border-dashed border-blue-400 p-6 w-full text-center mb-10">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Receipt Note</p>
              <p className="text-xs font-bold text-slate-600 uppercase">Your request has been dispatched to the vendors.</p>
           </div>

           <button 
             onClick={() => router.push('/user/dashboard')} 
             className="w-full bg-[#4f81c7] hover:bg-[#3460C0] text-white py-4 font-black uppercase text-xs shadow-lg border-b-4 border-black active:translate-y-1 transition-all"
           >
              Return to Shopping Console
           </button>
        </div>
      </div>
    )
  }

  const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex justify-between items-center">
           <button onClick={() => router.back()} className="bg-white border-2 border-gray-400 px-6 py-1 font-black uppercase text-[10px] shadow hover:bg-gray-50">← Adjust Cart</button>
           <h1 className="bg-white border-4 border-gray-400 px-12 py-3 font-black uppercase text-2xl shadow-xl tracking-tighter">Checkout Registry</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
           {/* Summary Side */}
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#4f81c7] text-white p-6 border-4 border-black shadow-lg relative overflow-hidden">
                 <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/10 rotate-45"></div>
                 <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Payable Total</p>
                 <p className="text-4xl font-black italic">Rs {grandTotal.toFixed(2)}/-</p>
              </div>

              <div className="bg-white border-2 border-gray-400 p-4 shadow">
                 <p className="text-[10px] font-black uppercase text-gray-400 mb-2 border-b-2 border-gray-100 pb-1">Order Summary</p>
                 <div className="space-y-2">
                    {cart.map((item, i) => (
                      <div key={i} className="flex justify-between text-[11px] font-bold text-slate-600 uppercase">
                         <span>{item.name} x {item.quantity}</span>
                         <span>Rs {item.price * item.quantity}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Form Side */}
           <div className="lg:col-span-3 bg-white border-4 border-gray-400 p-8 shadow-2xl">
              <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6">
                 {error && <div className="bg-red-50 border-2 border-red-200 text-red-600 p-3 text-[10px] font-black uppercase text-center">{error}</div>}
                 
                 {step === 1 ? (
                    <div className="space-y-4">
                       <p className="text-[11px] font-black uppercase tracking-widest text-[#4f81c7] mb-6">Step 1: Identity & Location</p>
                       {[
                         { name: 'name', label: 'Full Name', type: 'text' },
                         { name: 'email', label: 'Email Address', type: 'email' },
                         { name: 'address', label: 'Physical Address', type: 'text' },
                         { name: 'city', label: 'City', type: 'text' }
                       ].map(field => (
                          <div key={field.name} className="flex flex-col gap-1">
                             <label className="text-[10px] font-black uppercase text-gray-400 ml-1">{field.label}</label>
                             <input 
                               name={field.name} 
                               type={field.type}
                               value={(formData as any)[field.name]} 
                               onChange={handleChange} 
                               className="w-full border-2 border-gray-200 focus:border-[#4f81c7] p-3 text-sm font-bold uppercase transition-colors outline-none bg-gray-50 shadow-inner" 
                               required 
                             />
                          </div>
                       ))}
                       <button type="submit" className="w-full bg-[#4f81c7] hover:bg-[#3460C0] text-white py-4 font-black uppercase text-xs shadow-lg border-b-4 border-black active:translate-y-1 transition-all mt-6">
                          Proceed to Payment →
                       </button>
                    </div>
                 ) : (
                    <div className="space-y-4">
                       <p className="text-[11px] font-black uppercase tracking-widest text-[#4f81c7] mb-6">Step 2: Billing Details</p>
                       
                       <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Contact Number</label>
                          <input name="number" value={formData.number} onChange={handleChange} className="w-full border-2 border-gray-200 focus:border-[#4f81c7] p-3 text-sm font-bold uppercase outline-none bg-gray-50 shadow-inner" required />
                       </div>

                       <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Voucher / Payment</label>
                          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border-2 border-gray-200 focus:border-[#4f81c7] p-3 text-sm font-bold uppercase outline-none bg-gray-50 shadow-inner cursor-pointer" required>
                             <option value="Cash">Cash on Delivery</option>
                             <option value="UPI">UPI / Digital Transfer</option>
                          </select>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                             <label className="text-[10px] font-black uppercase text-gray-400 ml-1">State</label>
                             <input name="state" value={formData.state} onChange={handleChange} className="w-full border-2 border-gray-200 focus:border-[#4f81c7] p-3 text-sm font-bold uppercase outline-none bg-gray-50 shadow-inner" required />
                          </div>
                          <div className="flex flex-col gap-1">
                             <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Postal Code</label>
                             <input name="pinCode" value={formData.pinCode} onChange={handleChange} className="w-full border-2 border-gray-200 focus:border-[#4f81c7] p-3 text-sm font-bold uppercase outline-none bg-gray-50 shadow-inner" required />
                          </div>
                       </div>

                       <div className="pt-6 flex gap-4">
                          <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 border-2 border-gray-300 py-4 font-black uppercase text-[10px] hover:bg-gray-200">Back</button>
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`flex-[2] py-4 font-black uppercase text-xs shadow-lg border-b-4 border-black transition-all ${
                              isSubmitting ? 'bg-gray-300 text-gray-500 cursor-wait' : 'bg-[#558844] hover:bg-[#457038] text-white active:translate-y-1'
                            }`}
                          >
                             {isSubmitting ? 'Processing...' : 'Place Order Now'}
                          </button>
                       </div>
                    </div>
                 )}
              </form>
           </div>
        </div>
      </div>
    </div>
  )
}
