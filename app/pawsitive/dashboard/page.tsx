'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import { LoadingScreen } from '@/components/LoadingScreen'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Adjust this delay as needed

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <Dashboard />
    </div>
  )
}

