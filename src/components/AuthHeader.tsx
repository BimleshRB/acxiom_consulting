"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useStore } from "@/lib/store"

export default function AuthHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const { currentUser, setLogout } = useStore()

  const isLoginPage = pathname === '/' || pathname?.startsWith('/login') || pathname?.startsWith('/signup')

  const handleLogout = () => {
    setLogout()
    router.push('/')
  }

  if (isLoginPage) return null

  return (
    <header className="bg-[#4f81c7] border-b-4 border-black px-8 py-3 flex justify-between items-center z-50 sticky top-0 shadow-lg">
       <div className="flex items-center gap-4">
          <Link href={`/${currentUser?.role}/dashboard`} className="font-black text-white uppercase italic tracking-tighter text-2xl hover:scale-105 transition-transform">
             EMS Console
          </Link>
          <div className="hidden md:block h-6 w-[2px] bg-white opacity-20"></div>
          <span className="hidden md:block text-[10px] text-white font-black uppercase tracking-[0.3em] opacity-80">
             {currentUser?.role || 'Guest'} Portal
          </span>
       </div>

       <div className="flex items-center gap-6">
          <Link 
            href="/flowchart" 
            className="text-white font-black text-[10px] uppercase border-2 px-4 py-1 border-white/40 hover:bg-white hover:text-[#4f81c7] transition-all shadow-inner"
          >
             Blueprint Chart
          </Link>
          <button 
            onClick={handleLogout}
            className="bg-white text-black px-6 py-2 font-black uppercase text-[11px] shadow-[4px_4px_0_0_rgba(0,0,0,1)] border-2 border-black hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none"
          >
            LogOut System
          </button>
       </div>
    </header>
  )
}
