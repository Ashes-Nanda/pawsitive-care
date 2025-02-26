'use client'

import { useState, useEffect } from 'react'
import TailTrackerDashboard from '@/components/TailTrackerDashboard'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Sidebar } from '@/components/Sidebar'

export default function TailTrackerPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <TailTrackerDashboard />
      </main>
    </div>
  )
}

