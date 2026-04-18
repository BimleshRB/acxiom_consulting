"use server"

import connectToDatabase from "@/lib/db"
import { User } from "@/models"
import { Role } from "@/lib/store" // just for type

export async function loginUserAction(email: string, password: string, role: Role) {
  console.log(`[AUTH] Login attempt: email=${email}, role=${role}`);
  
  await connectToDatabase()
  
  // Try to find the user by email first to see if they exist with any role
  const searchEmail = email.toLowerCase().trim()
  const userByEmail = await User.findOne({ email: searchEmail }).lean()
  
  if (!userByEmail) {
    console.log(`[AUTH] No user found with email: ${email}`);
    return { success: false, error: "User not found" }
  }

  // Check if the found user has the correct role
  if (userByEmail.role !== role) {
    console.log(`[AUTH] Role mismatch: Found ${userByEmail.role}, expected ${role}`);
    return { success: false, error: `This account is registered as a ${userByEmail.role}, not a ${role}.` }
  }

  // Check password
  if (userByEmail.password !== password) {
    console.log(`[AUTH] Password mismatch for ${email}`);
    return { success: false, error: "Invalid password" }
  }

  console.log(`[AUTH] Login successful for ${email}`);
  return { 
    success: true, 
    user: { 
      id: userByEmail._id.toString(), 
      name: userByEmail.name, 
      email: userByEmail.email, 
      role: userByEmail.role, 
      category: userByEmail.category 
    } 
  }
}

export async function signupUserAction(data: { name: string, email: string, password: string, role: Role, category?: string }) {
  await connectToDatabase()
  
  const existing = await User.findOne({ email: data.email }).lean()
  if (existing) {
    return { success: false, error: "Email already exists" }
  }

  const user = await User.create(data)
  return { 
    success: true, 
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role, category: user.category } 
  }
}
