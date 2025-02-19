'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GeofenceSetup from '@/components/GeofenceSetup'

export default function GeofenceSettingsPage() {
  const [geofenceRadius, setGeofenceRadius] = useState<number | null>(null)

  const handleSaveGeofence = (radius: number) => {
    setGeofenceRadius(radius)
    // In a real application, you would save this to a database or state management system
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-400 neon mb-6">TailTracker Geofence Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Configure Geofence</CardTitle>
        </CardHeader>
        <CardContent>
          <GeofenceSetup onSave={handleSaveGeofence} />
          {geofenceRadius && (
            <p className="mt-4 text-emerald-400">
              Current geofence radius: {geofenceRadius} meters
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

