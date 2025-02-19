'use client'

import { useState, useEffect } from 'react'
import TailTrackerDashboard from '@/components/TailTrackerDashboard'
import { LoadingScreen } from '@/components/LoadingScreen'

export default function TailTrackerPage() {
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
    <div className="container mx-auto p-6">
      <TailTrackerDashboard />
    </div>
  )
}

