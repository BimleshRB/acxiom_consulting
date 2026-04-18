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

    const vendorItems: Record<string, any[]> = {}
    cart.forEach(c => {
      if (!vendorItems[c.vendorId]) vendorItems[c.vendorId] = []
      vendorItems[c.vendorId].push(c)
    })

    for (const vendorId of Object.keys(vendorItems)) {
      const vItems = vendorItems[vendorId]
      const totalAmount = vItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      await placeOrderAction({
        userId: currentUser.id,
        vendorId,
        products: vItems.map(i => ({ productId: i.productId, quantity: i.quantity })),
        totalAmount,
        status: 'Received',
        customerDetails: formData
      })
    }

    clearCart()
    setShowPopup(true)
  }

  if (showPopup) {
    return (
      <div className="fixed inset-0 bg-gray-200 flex items-center justify-center p-4">
        <div className="w-[400px] h-[500px] bg-[#d3d3d3] border shadow-sm p-4 relative flex flex-col items-center">
           <div className="absolute right-4 text-xs font-medium cursor-pointer" onClick={() => router.push('/user/dashboard')}>PopUp</div>
           <div className="mt-8 mb-12 text-sm font-medium">THANK YOU</div>
           
           <div className="bg-[#4f81c7] text-white py-1 px-8 mb-8 text-sm font-bold shadow-sm">
             Total Amount
           </div>

           <div className="grid grid-cols-[100px_100px] gap-8 mb-16">
              <div className="bg-[#4f81c7] h-8 shadow-inner"></div>
              <div className="bg-[#4f81c7] h-8 shadow-inner"></div>
              <div className="bg-[#4f81c7] h-8 shadow-inner"></div>
              <div className="bg-[#4f81c7] h-8 shadow-inner"></div>
              <div className="bg-[#4f81c7] h-8 shadow-inner"></div>
              <div className="bg-[#4f81c7] h-8 shadow-inner"></div>
           </div>

           <button onClick={() => router.push('/user/dashboard')} className="bg-[#4f81c7] hover:bg-[#3460C0] -ml-24 text-white py-2 px-6 shadow-sm border border-gray-400 text-sm font-bold">
              Continue Shopping
           </button>
        </div>
      </div>
    )
  }

  const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center py-12">
      <div className="w-[500px] bg-[#d3d3d3] border flex flex-col relative pt-12">

        <div className="w-48 bg-[#4f81c7] text-white py-1 font-medium text-center shadow-sm absolute -left-8 top-12 opacity-80 z-10 text-xs">
           Grand Total {grandTotal.toFixed(2)}/-
        </div>

        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="flex flex-col items-center gap-6 z-20">
          
          {step === 1 ? (
             <div className="flex flex-col gap-6 ml-24 items-center">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="bg-[#4f81c7] text-white px-4 py-2 w-48 shadow outline-none border-none placeholder:text-white" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" className="bg-[#4f81c7] text-white px-4 py-2 w-48 shadow outline-none border-none placeholder:text-white" required />
                <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="bg-[#4f81c7] text-white px-4 py-2 w-48 shadow outline-none border-none placeholder:text-white" required />
                <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="bg-[#4f81c7] text-white px-4 py-2 w-48 shadow outline-none border-none placeholder:text-white" required />

                <div className="mt-8 translate-x-24">
                   <button type="submit" className="bg-[#4f81c7] hover:bg-[#3460C0] text-black px-6 py-2 shadow-sm font-bold">
                     Order Now
                   </button>
                </div>
             </div>
          ) : (
             <div className="flex flex-col gap-6 ml-24 items-center relative">
                <input name="number" value={formData.number} onChange={handleChange} placeholder="Number" className="bg-[#4f81c7] text-black px-4 py-2 w-48 shadow outline-none border-none placeholder:text-black font-medium" required />
                
                <div className="bg-[#4f81c7] w-48 shadow outline-none border-none text-black relative flex items-center pr-2 pl-4 py-2 font-medium">
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="bg-transparent border-none appearance-none outline-none w-full text-black" required>
                    <option value="Cash / UPI">Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                  </select>
                  <div className="pointer-events-none absolute right-4">V</div>
                  {/* Fake popup from layout ref */}
                  <div className="absolute left-[110%] top-0 text-black text-xs font-semibold whitespace-nowrap bg-white p-2 border border-gray-400 shadow">
                     Drop Down<br/>Cash / UPI
                  </div>
                </div>

                <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="bg-[#4f81c7] text-black px-4 py-2 w-48 shadow outline-none border-none placeholder:text-black font-medium" required />
                <input name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pin Code" className="bg-[#4f81c7] text-black px-4 py-2 w-48 shadow outline-none border-none placeholder:text-black font-medium" required />

                <div className="mt-8 -translate-x-24">
                   <button type="submit" className="bg-[#4f81c7] hover:bg-[#3460C0] text-black px-6 py-2 shadow-sm border border-gray-400 font-bold">
                     Order Now
                   </button>
                </div>
             </div>
          )}
        </form>
        <div className="h-24"></div>
      </div>
    </div>
  )
}
