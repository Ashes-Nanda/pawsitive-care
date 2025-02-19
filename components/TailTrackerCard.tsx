'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MapPin, AlertCircle } from 'lucide-react'
import { TailTrackerLoader } from './TailTrackerLoader'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface TailTrackerCardProps {
  onConnect: () => void
}

export function TailTrackerCard({ onConnect }: TailTrackerCardProps) {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle')

  const handleConnect = () => {
    setStatus('connecting')
    onConnect()
    // Simulate connection process
    setTimeout(() => {
      setStatus(Math.random() > 0.3 ? 'connected' : 'error')
    }, 3000)
  }

  return (
    <Card className="card-3d h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-emerald-400">
          <MapPin className="mr-2" />
          TailTracker
        </CardTitle>
        <CardDescription>
          Track your pet's location, activity, and set up geofences.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <AnimatePresence mode="wait">
          {status === 'connecting' ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center space-y-4"
            >
              <TailTrackerLoader className="w-32 h-32" />
              <div className="text-center">
                <p className="text-lg font-semibold text-emerald-400">
                  Connecting to your Tail Tracker...
                </p>
                <p className="text-sm text-zinc-400">
                  Please wait while we establish a connection!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full"
            >
              <div className="h-[250px] w-full overflow-hidden mb-4 rounded-lg shadow-lg">
                <Image
                  src="/placeholder.svg?height=250&width=400"
                  alt="TailTracker Dashboard preview"
                  width={400}
                  height={250}
                  className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {status === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Failed</AlertTitle>
            <AlertDescription>
              Unable to connect to your TailTracker. Please check your device and try again.
            </AlertDescription>
          </Alert>
        )}

        {status === 'connected' && (
          <Alert className="bg-emerald-500/10 border-emerald-500 text-emerald-500">
            <AlertTitle>Successfully Connected!</AlertTitle>
            <AlertDescription>
              Your TailTracker is now ready to use.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleConnect}
          disabled={status === 'connecting'}
          className="w-full glass-button"
        >
          {status === 'idle' && 'Connect TailTracker'}
          {status === 'connecting' && 'Connecting...'}
          {status === 'connected' && 'Connected'}
          {status === 'error' && 'Retry Connection'}
        </Button>
      </CardContent>
    </Card>
  )
}

