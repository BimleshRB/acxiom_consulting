"use server"

import connectToDatabase from "@/lib/db"
import { Product, Order } from "@/models"

export async function addProductAction(vendorId: string, name: string, price: number, imageUrl: string) {
  try {
    await connectToDatabase()
    const product = await Product.create({ vendorId, name, price, imageUrl })
    return { success: true, id: product._id.toString() }
  } catch (err: any) {
    console.error(`[VENDOR-ADD-ERROR]:`, err.message);
    return { success: false, error: "Failed to register product." }
  }
}

export async function getVendorProductsAction(vendorId: string) {
  try {
    await connectToDatabase()
    const products = await Product.find({ vendorId }).lean()
    return {
      success: true,
      data: products.map(p => ({ 
        id: p._id.toString(), 
        vendorId: p.vendorId.toString(), 
        name: p.name, 
        price: p.price, 
        imageUrl: p.imageUrl 
      }))
    }
  } catch (err: any) {
    console.error(`[VENDOR-LIST-ERROR]:`, err.message);
    return { success: false, data: [] }
  }
}

export async function deleteProductAction(productId: string) {
  try {
    await connectToDatabase()
    await Product.findByIdAndDelete(productId)
    return { success: true }
  } catch (err: any) {
    return { success: false, error: "Deletion failed." }
  }
}

export async function getVendorOrdersAction(vendorId: string) {
  try {
    await connectToDatabase()
    const orders = await Order.find({ vendorId }).lean()
    return {
      success: true,
      data: orders.map(o => ({ 
        id: o._id.toString(), 
        userId: o.userId.toString(), 
        vendorId: o.vendorId.toString(), 
        totalAmount: o.totalAmount, 
        status: o.status, 
        customerDetails: o.customerDetails 
      }))
    }
  } catch (err: any) {
     return { success: false, data: [] }
  }
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  try {
    await connectToDatabase()
    await Order.findByIdAndUpdate(orderId, { status })
    return { success: true }
  } catch (err: any) {
    return { success: false }
  }
}
