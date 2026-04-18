"use server"

import connectToDatabase from "@/lib/db"
import { User, Product, Order } from "@/models"

export async function getVendorsByCategoryAction(category: string | null) {
  await connectToDatabase()
  const query = category ? { role: 'vendor', category } : { role: 'vendor' }
  const vendors = await User.find(query).lean()
  return vendors.map(v => ({ id: v._id.toString(), name: v.name, email: v.email, category: v.category }))
}

export async function getVendorDetailsAction(vendorId: string) {
  await connectToDatabase()
  const vendor = await User.findById(vendorId).lean()
  if (!vendor) return null
  return { id: vendor._id.toString(), name: vendor.name, category: vendor.category }
}

export async function placeOrderAction(data: any) {
  await connectToDatabase()
  const order = await Order.create(data)
  return { success: true, id: order._id.toString() }
}

export async function getUserOrdersAction(userId: string) {
  await connectToDatabase()
  const orders = await Order.find({ userId }).populate('vendorId', 'name').lean()
  
  return orders.map(o => ({ 
    id: o._id.toString(), 
    vendorName: (o.vendorId as any)?.name || 'Unknown', 
    totalAmount: o.totalAmount, 
    status: o.status 
  }))
}
