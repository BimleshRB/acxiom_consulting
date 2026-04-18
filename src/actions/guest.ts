"use server"

import connectToDatabase from "@/lib/db"
import { Guest } from "@/models"

export async function getGuestsAction(userId: string) {
  try {
    await connectToDatabase()
    const guests = await Guest.find({ userId }).lean()
    return {
      success: true,
      data: guests.map(g => ({
        id: g._id.toString(),
        name: g.name,
        email: g.email,
        phone: g.phone,
        status: g.status
      }))
    }
  } catch (err: any) {
    console.error(`[GET-GUESTS-ERROR]:`, err.message);
    return { success: false, data: [] }
  }
}

export async function addGuestAction(userId: string, data: { name: string, email?: string, phone?: string, status: string }) {
  try {
    await connectToDatabase()
    const guest = await Guest.create({ ...data, userId })
    return { success: true, id: guest._id.toString() }
  } catch (err: any) {
    return { success: false, error: "Failed to add guest." }
  }
}

export async function updateGuestAction(id: string, data: any) {
  try {
    await connectToDatabase()
    await Guest.findByIdAndUpdate(id, data)
    return { success: true }
  } catch (err: any) {
    return { success: false, error: "Update failed." }
  }
}

export async function deleteGuestAction(id: string) {
  try {
    await connectToDatabase()
    await Guest.findByIdAndDelete(id)
    return { success: true }
  } catch (err: any) {
    return { success: false, error: "Deletion failed." }
  }
}
