"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

enum ConnectionStatus {
  Disconnected,
  Connecting,
  Connected,
  Error,
}

interface ConnectTailTrackerButtonProps {
  onConnectToggle: (connected: boolean) => void; // ✅ Function to toggle connection
}

export function ConnectTailTrackerButton({
  onConnectToggle,
}: ConnectTailTrackerButtonProps) {
  const [status, setStatus] = useState<ConnectionStatus>(
    ConnectionStatus.Disconnected
  );

  const handleToggleConnection = () => {
    if (status === ConnectionStatus.Connected) {
      // ✅ Disconnecting
      setStatus(ConnectionStatus.Disconnected);
      onConnectToggle(false);
    } else {
      // ✅ Connecting
      setStatus(ConnectionStatus.Connecting);
      setTimeout(() => {
        const success = Math.random() > 0.3; // Simulate a 70% success rate
        if (success) {
          setStatus(ConnectionStatus.Connected);
          onConnectToggle(true);
        } else {
          setStatus(ConnectionStatus.Error);
        }
      }, 3000);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <div className="space-y-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleToggleConnection}
            disabled={status === ConnectionStatus.Connecting}
            className={`w-full h-16 text-lg font-semibold rounded-full transition-all duration-300 ${
              status === ConnectionStatus.Connected
                ? "bg-red-500 hover:bg-red-600" // 🔴 Disconnect
                : "bg-blue-500 hover:bg-blue-600" // 🔵 Connect
            } shadow-lg`}
            aria-label={
              status === ConnectionStatus.Connecting
                ? "Connecting..."
                : "Toggle Connection"
            }
          >
            {status === ConnectionStatus.Connecting
              ? "⏳ Connecting..."
              : status === ConnectionStatus.Connected
              ? "Disconnect"
              : "Connect to Tail Tracker"}
          </Button>
        </motion.div>

        {/* ✅ Success Alert */}
        {status === ConnectionStatus.Connected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert
              variant="default"
              className="bg-emerald-100 border-emerald-300"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <AlertTitle className="text-emerald-800">
                Successfully Connected!
              </AlertTitle>
              <AlertDescription className="text-emerald-600">
                Your furry friend is now being tracked.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* ❌ Error Alert */}
        {status === ConnectionStatus.Error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Failed!</AlertTitle>
              <AlertDescription>
                Please try again or check your device.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
