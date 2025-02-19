'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

enum ConnectionStatus {
  Disconnected,
  Connecting,
  Connected,
  Error
}

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
}

const alertVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
}

export function ConnectTailTrackerButton() {
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.Disconnected)

  const handleConnect = () => {
    setStatus(ConnectionStatus.Connecting)
    // Simulate connection process
    setTimeout(() => {
      const success = Math.random() > 0.3 // 70% success rate for demonstration
      setStatus(success ? ConnectionStatus.Connected : ConnectionStatus.Error)
    }, 3000)
  }

  const buttonText = () => {
    switch (status) {
      case ConnectionStatus.Disconnected:
        return "Connect to Tail Tracker"
      case ConnectionStatus.Connecting:
        return "Connecting..."
      case ConnectionStatus.Connected:
        return "Connected"
      case ConnectionStatus.Error:
        return "Retry Connection"
    }
  }

  return (
    <AnimatePresence mode="wait">
      <div className="space-y-4">
        <motion.div
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={handleConnect}
            disabled={status === ConnectionStatus.Connecting}
            className={`w-full h-16 text-lg font-semibold rounded-full transition-all duration-300 ${
              status === ConnectionStatus.Connected
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600'
                : 'bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600'
            } shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
            aria-label={buttonText()}
          >
            {status === ConnectionStatus.Connecting ? (
              <div className="radar-loader w-12 h-12 scale-75">
                <span></span>
              </div>
            ) : (
              buttonText()
            )}
          </Button>
        </motion.div>

        <AnimatePresence>
          {status === ConnectionStatus.Connected && (
            <motion.div
              variants={alertVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Alert variant="default" className="bg-emerald-100 border-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <AlertTitle className="text-emerald-800">Successfully Connected!</AlertTitle>
                <AlertDescription className="text-emerald-600">
                  Your furry friend is now tracked!
                </AlertDescription>
              </Alert>
              <motion.div
                className="mt-4 flex justify-center"
                animate={{ 
                  rotate: [-10, 10, -10],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              >
                <span role="img" aria-label="Dog paw" className="text-4xl">🐾</span>
              </motion.div>
            </motion.div>
          )}

          {status === ConnectionStatus.Error && (
            <motion.div
              variants={alertVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Connection Failed!</AlertTitle>
                <AlertDescription>
                  Please try again or check your device settings.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  )
}

