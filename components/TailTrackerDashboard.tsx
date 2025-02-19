'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Battery, Activity, Clock, AlertTriangle } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import MapSection from './MapSection'
import GeofenceSetup from './GeofenceSetup'
import { ConnectTailTrackerButton } from './ConnectTailTrackerButton'
import SearchFeature from './SearchFeature'

// Mock data for TailTracker
const mockTailTrackerData = {
  latitude: 28.6139,  // New Delhi latitude
  longitude: 77.2090, // New Delhi longitude
  batteryLevel: 75,
  lastUpdate: new Date().toISOString(),
  activityLevel: 'Moderate',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

export default function TailTrackerDashboard() {
  const [trackerData, setTrackerData] = useState(mockTailTrackerData)
  const [geofenceRadius, setGeofenceRadius] = useState<number | null>(null)
  const [isOutsideGeofence, setIsOutsideGeofence] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch real-time data here
    const interval = setInterval(() => {
      const newLatitude = trackerData.latitude + (Math.random() - 0.5) * 0.01
      const newLongitude = trackerData.longitude + (Math.random() - 0.5) * 0.01
      
      setTrackerData(prevData => ({
        ...prevData,
        latitude: newLatitude,
        longitude: newLongitude,
        lastUpdate: new Date().toISOString(),
        batteryLevel: Math.max(0, prevData.batteryLevel - 1),
        activityLevel: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
      }))

      // Check if the new position is outside the geofence
      if (geofenceRadius) {
        const distance = calculateDistance(mockTailTrackerData.latitude, mockTailTrackerData.longitude, newLatitude, newLongitude)
        const newIsOutsideGeofence = distance > geofenceRadius / 1000 // Convert radius to km
        if (newIsOutsideGeofence && !isOutsideGeofence) {
          toast({
            title: "Geofence Alert",
            description: "Your pet has left the designated safe area!",
            variant: "destructive",
          })
        }
        setIsOutsideGeofence(newIsOutsideGeofence)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [trackerData.latitude, trackerData.longitude, geofenceRadius, isOutsideGeofence])

  const handleSaveGeofence = (radius: number) => {
    setGeofenceRadius(radius)
    toast({
      title: "Geofence Updated",
      description: `New geofence radius set to ${radius} meters.`,
    })
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
    <motion.div 
      className="flex flex-col lg:flex-row h-screen overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex-1 overflow-y-auto p-6 lg:p-8" variants={itemVariants}>
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.h1 
            className="text-3xl font-bold text-emerald-400 neon"
            variants={itemVariants}
          >
            TailTracker Dashboard
          </motion.h1>
          <motion.div variants={itemVariants}>
            <ConnectTailTrackerButton />
          </motion.div>
          {isOutsideGeofence && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Geofence Alert</AlertTitle>
                <AlertDescription>
                  Your pet has left the designated safe area!
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Battery className="mr-2" /> Battery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="w-full bg-zinc-200 rounded-full h-2.5 dark:bg-zinc-700 mr-2">
                      <motion.div 
                        className="bg-emerald-400 h-2.5 rounded-full" 
                        style={{ width: `${trackerData.batteryLevel}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${trackerData.batteryLevel}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <span>{trackerData.batteryLevel}%</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2" /> Activity Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.p
                    key={trackerData.activityLevel}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {trackerData.activityLevel}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2" /> Last Update
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.p
                    key={trackerData.lastUpdate}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {new Date(trackerData.lastUpdate).toLocaleString()}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Geofence Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <GeofenceSetup onSave={handleSaveGeofence} />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Search Nearby Services</CardTitle>
              </CardHeader>
              <CardContent>
                <SearchFeature />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
      <motion.div 
        className="w-full lg:w-1/2 lg:min-w-[500px] p-4 bg-zinc-100 dark:bg-zinc-800 overflow-y-auto"
        variants={itemVariants}
      >
        <MapSection 
          latitude={trackerData.latitude}
          longitude={trackerData.longitude}
          geofenceRadius={geofenceRadius || undefined}
        />
      </motion.div>
    </motion.div>
  )
}

