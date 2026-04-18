"use server"

import connectToDatabase from "@/lib/db"
import { User, Order } from "@/models"

export async function getVendorsByCategoryAction(category: string | null) {
  try {
    await connectToDatabase()
    const query = category ? { role: 'vendor', category } : { role: 'vendor' }
    const vendors = await User.find(query).lean()
    return {
      success: true,
      data: vendors.map(v => ({ id: v._id.toString(), name: v.name, email: v.email, category: v.category }))
    }
  } catch (err: any) {
    console.error(`[GET-VENDORS-ERROR]:`, err.message);
    return { success: false, data: [] }
  }
}

export async function getVendorDetailsAction(vendorId: string) {
  try {
    await connectToDatabase()
    const vendor = await User.findById(vendorId).lean()
    if (!vendor) return { success: false, error: "Vendor not found." }
    return { 
      success: true, 
      data: { id: vendor._id.toString(), name: vendor.name, category: vendor.category } 
    }
  } catch (err: any) {
    return { success: false, error: "Database error." }
  }
}

export async function placeOrderAction(data: any) {
  try {
    await connectToDatabase()
    const order = await Order.create(data)
    return { success: true, id: order._id.toString() }
  } catch (err: any) {
    return { success: false, error: "Order placement failed." }
  }
}

export async function getUserOrdersAction(userId: string) {
  try {
    await connectToDatabase()
    const orders = await Order.find({ userId }).populate('vendorId', 'name').lean()
    
    return {
      success: true,
      data: orders.map(o => ({ 
        id: o._id.toString(), 
        vendorName: (o.vendorId as any)?.name || 'Unknown', 
        totalAmount: o.totalAmount, 
        status: o.status 
      }))
    }
  } catch (err: any) {
    return { success: false, data: [] }
  }
}
