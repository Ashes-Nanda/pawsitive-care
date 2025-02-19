import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactSVG } from 'react-svg'
import { Loader2, MapPin } from 'lucide-react'

interface Location {
  id: number
  name: string
  address: string
  lat?: number
  lng?: number
}

interface MapComponentProps {
  locations?: Location[]
  latitude: number
  longitude: number
  geofenceRadius?: number
}

const MapComponent: React.FC<MapComponentProps> = ({ locations = [], latitude, longitude, geofenceRadius }) => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const convertToSVGCoords = (lat: number, long: number) => {
    const x = ((long - 68) / (97 - 68)) * 1000
    const y = ((37 - lat) / (37 - 6)) * 1000
    return { x, y }
  }

  const { x, y } = convertToSVGCoords(latitude, longitude)

  return (
    <div className="w-full h-[400px] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden shadow-lg relative">
      <AnimatePresence>
        {!mapLoaded && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: mapLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <ReactSVG
          src="/india_map.svg"
          beforeInjection={(svg) => {
            svg.setAttribute('viewBox', '0 0 1000 1000')
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
            svgRef.current = svg
          }}
          className="w-full h-full [&_path]:transition-all [&_path]:duration-300 [&_path:hover]:fill-emerald-200 [&_path]:fill-emerald-100 [&_path]:stroke-emerald-600 [&_path]:stroke-[0.5]"
        />
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-0 left-0 pointer-events-none"
        >
          {locations.map((location, index) => {
            const { x, y } = convertToSVGCoords(location.lat || latitude, location.lng || longitude)
            return (
              <motion.g
                key={location.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <circle cx={x} cy={y} r="6" fill="red" />
                <text x={x + 10} y={y + 5} fontSize="12" fill="white">
                  {location.name}
                </text>
              </motion.g>
            )
          })}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <circle
              cx={x}
              cy={y}
              r="6"
              fill="blue"
            />
            <motion.circle
              cx={x}
              cy={y}
              r="10"
              fill="transparent"
              stroke="rgba(0, 0, 255, 0.5)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.g>
          {geofenceRadius && (
            <motion.circle
              cx={x}
              cy={y}
              r={geofenceRadius / 111000 * (1000 / (37 - 6))}
              fill="rgba(0, 255, 0, 0.1)"
              stroke="rgba(0, 128, 0, 0.5)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </svg>
      </motion.div>
    </div>
  )
}

export default MapComponent

