"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import Link from 'next/link'
import { useStore, Role } from "@/lib/store"
import { loginUserAction } from "@/actions/auth"

export default function LoginPage() {
  const router = useRouter()
  const params = useParams()
  const role = params.role as Role
  
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { setCurrentUser } = useStore()

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      setError("")
      setIsSubmitting(true)
      console.log(`[CLIENT-LOGIN] Triggered at ${new Date().toLocaleTimeString()}`);
      
      try {
        // Auto-correct: remove leading/trailing whitespace
        let cleanEmail = email.trim()
        
        const res = await loginUserAction(cleanEmail, password.trim(), role)
        console.log(`[CLIENT-LOGIN] Response received: success=${res.success}`);

        if (res.success && res.user) {
          setCurrentUser(res.user)
          const target = role === 'admin' ? '/admin/dashboard' : role === 'vendor' ? '/vendor/dashboard' : '/user/dashboard';
          router.push(target)
        } else {
          setError(res.error || "Login Failed")
        }
      } catch (err) {
        console.error("[CLIENT-LOGIN] Unexpected error:", err);
        setError("An unexpected system error occurred.")
      } finally {
        setIsSubmitting(false)
      }
  }

  const fillTestAccount = () => {
    if (role === 'admin') { setEmail('admin@event.com'); setPassword('admin'); }
    else if (role === 'vendor') { setEmail('catering@vendor.com'); setPassword('vendor'); }
    else if (role === 'user') { setEmail('user@user.com'); setPassword('user'); }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-[#ccc] p-8 w-full max-w-[500px] shadow-lg border border-gray-400">
        {/* Top Header Box per PDF */}
        <div className="bg-[#BDE0F6] w-full py-3 px-6 mb-6 text-center border-b-2 border-slate-400 text-sm font-bold uppercase tracking-wide text-slate-800">
          Event Management System
        </div>

        <div className="mb-6 flex justify-center">
          <button 
            type="button" 
            onClick={fillTestAccount}
            className="bg-[#558844] text-white text-[10px] font-bold py-1 px-4 border border-black shadow hover:bg-[#457038] uppercase"
          >
            Click to Use Test Account
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 text-center mb-6 text-sm font-bold animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
            <div className="bg-[#4f81c7] text-white w-full sm:w-28 py-2 px-4 text-xs font-bold shadow-sm uppercase text-center sm:text-left">
               User Id
            </div>
            <div className="flex-1 bg-[#BDE0F6] shadow-inner">
               <input 
                 type="text" 
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                 placeholder="Enter Email"
                 className="w-full bg-transparent border-none outline-none py-2 px-4 text-black placeholder:text-black/30 font-medium"
                 required
               />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
            <div className="bg-[#4f81c7] text-white w-full sm:w-28 py-2 px-4 text-xs font-bold shadow-sm uppercase text-center sm:text-left">
               Password
            </div>
            <div className="flex-1 bg-[#BDE0F6] shadow-inner">
               <input 
                 type="password" 
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 placeholder="Enter Password"
                 className="w-full bg-transparent border-none outline-none py-2 px-4 text-black placeholder:text-black/30 font-medium"
                 required
               />
            </div>
          </div>

          <div className="flex justify-center sm:justify-end gap-4 pt-8">
            <button type="button" onClick={() => router.push('/')} className="bg-gray-400 hover:bg-gray-500 text-black px-8 py-2 border-2 border-gray-600 shadow-md font-bold uppercase text-xs transition-colors">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`px-8 py-2 border-2 border-gray-600 shadow-md font-black uppercase text-xs transition-all ${
                isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-400 hover:bg-gray-500 text-black active:translate-y-1'
              }`}
            >
              {isSubmitting ? 'Process...' : 'Login System'}
            </button>
          </div>
        </form>

        {role !== 'admin' && (
          <div className="mt-8 pt-8 border-t border-gray-400 flex justify-center">
             <Link href={`/signup/${role}`} className="bg-[#4f81c7] hover:bg-[#3d6cae] text-white text-xs font-bold px-6 py-2 shadow-md uppercase tracking-wide transition-colors">
               Sign Up
             </Link>
          </div>
        )}
      </div>
    </div>
  )
}
