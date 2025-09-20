"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ResetPasswordRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/login") // redirect to login or home
  }, [router])
  return null
}
