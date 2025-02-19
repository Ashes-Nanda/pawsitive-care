'use client'

import { useState, useEffect } from 'react'
import GPSTrackerDashboard from '@/components/GPSTrackerDashboard'
import { LoadingScreen } from '@/components/LoadingScreen'

export default function GPSTrackerPage() {
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
      <GPSTrackerDashboard />
    </div>
  )
}

