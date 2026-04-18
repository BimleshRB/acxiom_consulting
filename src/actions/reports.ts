"use server"

import connectToDatabase from "@/lib/db"
import { Order, User, Membership } from "@/models"

export async function getAdminReportsAction() {
  await connectToDatabase()
  const totalUsers = await User.countDocuments({ role: 'user' })
  const totalVendors = await User.countDocuments({ role: 'vendor' })
  const totalOrders = await Order.countDocuments()
  const totalRevenue = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ])
  
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('userId', 'name')
    .populate('vendorId', 'name')
    .lean()

  return {
    stats: {
      users: totalUsers,
      vendors: totalVendors,
      orders: totalOrders,
      revenue: totalRevenue[0]?.total || 0
    },
    recentOrders: recentOrders.map(o => ({
      id: o._id.toString(),
      userName: (o.userId as any)?.name || 'Unknown',
      vendorName: (o.vendorId as any)?.name || 'Unknown',
      amount: o.totalAmount,
      date: o.createdAt.toISOString()
    }))
  }
}

export async function getUserReportsAction(userId: string) {
  await connectToDatabase()
  const orders = await Order.find({ userId })
    .sort({ createdAt: -1 })
    .populate('vendorId', 'name')
    .lean()

  return orders.map(o => ({
    id: o._id.toString(),
    vendorName: (o.vendorId as any)?.name || 'Unknown',
    amount: o.totalAmount,
    status: o.status,
    date: o.createdAt.toISOString()
  }))
}
