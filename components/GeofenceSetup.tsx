import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'

interface GeofenceSetupProps {
  onSave: (radius: number) => void
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

const GeofenceSetup: React.FC<GeofenceSetupProps> = ({ onSave }) => {
  const [radius, setRadius] = useState<number>(100)

  const handleSave = () => {
    onSave(radius)
  }

  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center space-x-2" variants={itemVariants}>
        <AlertCircle className="text-var(--color-accent)" />
        <p className="text-sm text-var(--color-accent)">Set a geofence to receive alerts when your pet leaves the area.</p>
      </motion.div>
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="geofence-radius">Geofence Radius (meters)</Label>
        <Input
          id="geofence-radius"
          type="number"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          min={50}
          max={1000}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-800">Save Geofence</Button>
      </motion.div>
    </motion.div>
  )
}

export default GeofenceSetup

