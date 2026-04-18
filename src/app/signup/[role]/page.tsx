"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import { useStore, Role } from "@/lib/store"
import { signupUserAction } from "@/actions/auth"

export default function SignupPage() {
  const router = useRouter()
  const params = useParams()
  const role = params.role as Role
  
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [category, setCategory] = React.useState("Catering")
  const [error, setError] = React.useState("")
  
  const { setCurrentUser } = useStore()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    const res = await signupUserAction({
      name, email, password, role,
      category: role === 'vendor' ? category : undefined
    })
    
    if (res.success && res.user) {
      setCurrentUser({
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role as Role,
        category: res.user.category
      })
      if (role === 'vendor') router.push('/vendor/dashboard')
      if (role === 'user') router.push('/user/dashboard')
    } else {
      setError(res.error || "Signup Failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-8">
      <div className="bg-[#ccc] p-8 w-[600px]">
        {/* Top Header Box per PDF */}
        <div className="bg-[#BDE0F6] w-full py-2 px-4 mb-10 text-center border-b border-gray-400 text-sm">
          Event Management System
        </div>

        {error && <div className="text-red-600 text-center mb-4 text-sm font-bold">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-6">
          
          {/* Name Field */}
          <div className="flex items-center gap-4">
            <div className="bg-[#4f81c7] text-white w-32 py-1 px-4 text-sm font-bold shadow-sm">
               Name
            </div>
            <div className="flex-1 bg-[#BDE0F6] shadow-inner text-sm">
               <input 
                 type="text" 
                 value={name}
                 onChange={e => setName(e.target.value)}
                 className="w-full bg-transparent border-none outline-none py-1 px-3 text-black"
                 required
               />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex items-center gap-4">
            <div className="bg-[#4f81c7] text-white w-32 py-1 px-4 text-sm font-bold shadow-sm">
               Email
            </div>
            <div className="flex-1 bg-[#BDE0F6] shadow-inner text-sm">
               <input 
                 type="email" 
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                 className="w-full bg-transparent border-none outline-none py-1 px-3 text-black"
                 required
               />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex items-center gap-4">
            <div className="bg-[#4f81c7] text-white w-32 py-1 px-4 text-sm font-bold shadow-sm">
               Password
            </div>
            <div className="flex-1 bg-[#BDE0F6] shadow-inner text-sm">
               <input 
                 type="password" 
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 className="w-full bg-transparent border-none outline-none py-1 px-3 text-black"
                 required
               />
            </div>
          </div>

          {role === 'vendor' && (
            <div className="flex items-center gap-4">
              <div className="bg-[#4f81c7] text-white w-32 py-1 px-4 text-sm font-bold shadow-sm">
                 Category
              </div>
              <div className="flex-1 bg-[#4f81c7] relative text-sm pl-1 pr-6 py-1">
                 <select 
                   value={category}
                   onChange={e => setCategory(e.target.value)}
                   className="w-full bg-transparent text-white border-none outline-none cursor-pointer"
                   required
                 >
                   <option value="Catering" className="text-black bg-gray-200">Catering</option>
                   <option value="Florist" className="text-black bg-gray-200">Florist</option>
                   <option value="Decoration" className="text-black bg-gray-200">Decoration</option>
                   <option value="Lighting" className="text-black bg-gray-200">Lighting</option>
                 </select>
                 <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white">▼</div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-6 pt-10">
            <button type="button" onClick={() => router.push(`/login/${role}`)} className="bg-[#4f81c7] hover:bg-[#3d6cae] text-white px-6 py-1 shadow-sm">
              Back
            </button>
            <button type="submit" className="bg-[#4f81c7] hover:bg-[#3d6cae] text-white px-6 py-1 shadow-sm">
              Sign Up
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
