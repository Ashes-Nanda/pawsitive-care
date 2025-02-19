'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MapPin, Battery, Activity, Clock, AlertTriangle } from 'lucide-react'
import MapComponent from './MapComponent'
import GeofenceSetup from './GeofenceSetup'

// Mock data for GPS tracker
const mockGPSData = {
  latitude: 40.7128,
  longitude: -74.0060,
  batteryLevel: 75,
  lastUpdate: new Date().toISOString(),
  activityLevel: 'Moderate',
}

export default function GPSTrackerDashboard() {
  const [gpsData, setGPSData] = useState(mockGPSData)
  const [showMap, setShowMap] = useState(true)
  const [geofenceRadius, setGeofenceRadius] = useState<number | null>(null)
  const [isOutsideGeofence, setIsOutsideGeofence] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch real-time data here
    const interval = setInterval(() => {
      const newLatitude = gpsData.latitude + (Math.random() - 0.5) * 0.01
      const newLongitude = gpsData.longitude + (Math.random() - 0.5) * 0.01
      
      setGPSData(prevData => ({
        ...prevData,
        latitude: newLatitude,
        longitude: newLongitude,
        lastUpdate: new Date().toISOString(),
        batteryLevel: Math.max(0, prevData.batteryLevel - 1),
        activityLevel: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
      }))

      // Check if the new position is outside the geofence
      if (geofenceRadius) {
        const distance = calculateDistance(mockGPSData.latitude, mockGPSData.longitude, newLatitude, newLongitude)
        setIsOutsideGeofence(distance > geofenceRadius / 1000) // Convert radius to km
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [gpsData.latitude, gpsData.longitude, geofenceRadius])

  const toggleMap = () => {
    setShowMap(!showMap)
  }

  const handleSaveGeofence = (radius: number) => {
    setGeofenceRadius(radius)
  }

  // Haversine formula to calculate distance between two points on Earth
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-emerald-400 neon">GPS Tracker Dashboard</h1>
      {isOutsideGeofence && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Geofence Alert</AlertTitle>
          <AlertDescription>
            Your pet has left the designated safe area!
          </AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <MapPin className="mr-2" /> Location Map
              </span>
              <Button variant="outline" size="sm" onClick={toggleMap}>
                {showMap ? 'Hide Map' : 'Show Map'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showMap && (
              <MapComponent 
                latitude={gpsData.latitude} 
                longitude={gpsData.longitude} 
                geofenceRadius={geofenceRadius || undefined}
              />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Battery className="mr-2" /> Battery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-full bg-zinc-200 rounded-full h-2.5 dark:bg-zinc-700 mr-2">
                <div 
                  className="bg-emerald-400 h-2.5 rounded-full" 
                  style={{ width: `${gpsData.batteryLevel}%` }}
                ></div>
              </div>
              <span>{gpsData.batteryLevel}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2" /> Activity Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{gpsData.activityLevel}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" /> Last Update
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{new Date(gpsData.lastUpdate).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Geofence Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <GeofenceSetup onSave={handleSaveGeofence} />
        </CardContent>
      </Card>
    </div>
  )
}

