"use server"

import connectToDatabase from "@/lib/db"
import { Product, Order } from "@/models"

export async function addProductAction(vendorId: string, name: string, price: number, imageUrl: string) {
  await connectToDatabase()
  const product = await Product.create({ vendorId, name, price, imageUrl })
  return { success: true, id: product._id.toString() }
}

export async function getVendorProductsAction(vendorId: string) {
  await connectToDatabase()
  const products = await Product.find({ vendorId }).lean()
  return products.map(p => ({ 
    id: p._id.toString(), 
    vendorId: p.vendorId.toString(), 
    name: p.name, 
    price: p.price, 
    imageUrl: p.imageUrl 
  }))
}

export async function deleteProductAction(productId: string) {
  await connectToDatabase()
  await Product.findByIdAndDelete(productId)
  return { success: true }
}

export async function getVendorOrdersAction(vendorId: string) {
  await connectToDatabase()
  const orders = await Order.find({ vendorId }).lean()
  return orders.map(o => ({ 
    id: o._id.toString(), 
    userId: o.userId.toString(), 
    vendorId: o.vendorId.toString(), 
    totalAmount: o.totalAmount, 
    status: o.status, 
    customerDetails: o.customerDetails 
  }))
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  await connectToDatabase()
  await Order.findByIdAndUpdate(orderId, { status })
  return { success: true }
}
