"use server"

import connectToDatabase from "@/lib/db"
import { User, Membership } from "@/models"

export async function getUsersAction(role: string) {
  try {
    await connectToDatabase()
    const list = await User.find({ role }).lean()
    return {
      success: true,
      data: list.map(u => ({ id: u._id.toString(), name: u.name, email: u.email, role: u.role, category: u.category }))
    }
  } catch (err: any) {
    console.error(`[ADMIN-GET-USERS-ERROR]:`, err.message);
    return { success: false, data: [] }
  }
}

export async function deleteUserAction(id: string) {
  try {
    await connectToDatabase()
    await User.findByIdAndDelete(id)
    return { success: true }
  } catch (err: any) {
    return { success: false, error: "Failed to delete user." }
  }
}

export async function addMembershipAction(vendorId: string, duration: '6 months' | '1 year' | '2 years') {
  try {
    await connectToDatabase()
    
    // Generate a random unique membership number
    const membershipNumber = "MEM" + Math.floor(100000 + Math.random() * 900000);
    
    const monthsMap = {
      '6 months': 6,
      '1 year': 12,
      '2 years': 24
    };
    
    const months = monthsMap[duration];
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + months);
    
    await Membership.findOneAndUpdate(
      { vendorId }, 
      { membershipNumber, duration, expiresAt, isActive: true }, 
      { upsert: true }
    )
    return { success: true, membershipNumber }
  } catch (err: any) {
    return { success: false, error: "Database error during membership creation." }
  }
}

export async function getMembershipByNumberAction(membershipNumber: string) {
  try {
    await connectToDatabase()
    const membership = await Membership.findOne({ membershipNumber }).populate('vendorId').lean()
    if (!membership) return { success: false, error: "Membership not found." }
    
    return {
      success: true,
      data: {
        id: membership._id.toString(),
        membershipNumber: membership.membershipNumber,
        vendorName: (membership.vendorId as any)?.name || 'Unknown',
        vendorEmail: (membership.vendorId as any)?.email || 'Unknown',
        duration: membership.duration,
        expiresAt: membership.expiresAt.toISOString(),
        isActive: membership.isActive
      }
    }
  } catch (err: any) {
    return { success: false, error: "Lookup failed." }
  }
}

export async function updateMembershipStatusAction(membershipNumber: string, action: 'extend' | 'cancel', duration?: string) {
  try {
    await connectToDatabase()
    const membership = await Membership.findOne({ membershipNumber })
    if (!membership) return { success: false, error: 'Not found' }
    
    if (action === 'cancel') {
      membership.isActive = false
    } else if (action === 'extend' && duration) {
      const monthsMap: any = {
        '6 months': 6,
        '1 year': 12,
        '2 years': 24
      }
      const months = monthsMap[duration] || 6
      const currentExpiry = new Date(membership.expiresAt)
      currentExpiry.setMonth(currentExpiry.getMonth() + months)
      membership.expiresAt = currentExpiry
      membership.isActive = true
    }
    
    await membership.save()
    return { success: true }
  } catch (err: any) {
     return { success: false, error: "Status update failed." }
  }
}
