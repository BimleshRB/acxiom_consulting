"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { currentUser } = useStore()

  React.useEffect(() => {
    if (!currentUser || currentUser.role !== 'vendor') {
      router.push('/login/vendor')
    }
  }, [currentUser, router])

  if (!currentUser || currentUser.role !== 'vendor') return null

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
