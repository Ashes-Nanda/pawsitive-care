import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { MapPin, ZoomIn, ZoomOut, RotateCcw, Home, Route } from 'lucide-react'
import MapComponent from './MapComponent'
import ImmersiveRouteView from './ImmersiveRouteView'

interface MapSectionProps {
  latitude: number
  longitude: number
  geofenceRadius?: number
}

export default function MapSection({ latitude, longitude, geofenceRadius }: MapSectionProps) {
  const [zoom, setZoom] = useState(12)
  const [showMap, setShowMap] = useState(true)
  const [currentLocation, setCurrentLocation] = useState({ latitude, longitude })
  const [rotation, setRotation] = useState(0)
  const [showImmersiveView, setShowImmersiveView] = useState(false)
  const [route, setRoute] = useState<{ start: [number, number]; end: [number, number] } | null>(null)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 1, 20))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 1, 8))
  const handleResetZoom = () => setZoom(12)

  const toggleMap = () => setShowMap(!showMap)

  const handleResetLocation = () => setCurrentLocation({ latitude, longitude })

  const handleRotate = () => setRotation(prev => (prev + 90) % 360)

  const handleToggleImmersiveView = () => {
    setShowImmersiveView(!showImmersiveView)
    if (!route) {
      // Set a dummy route for demonstration purposes
      setRoute({
        start: [currentLocation.longitude, currentLocation.latitude],
        end: [currentLocation.longitude + 0.1, currentLocation.latitude + 0.1],
      })
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <MapPin className="mr-2" /> 3D Location Map (India)
          </span>
          <div>
            <Button variant="outline" size="sm" onClick={toggleMap} className="mr-2 bg-black text-white hover:bg-gray-800">
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleToggleImmersiveView} className="bg-black text-white hover:bg-gray-800">
              {showImmersiveView ? 'Exit Immersive View' : 'Immersive View'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showMap && (
          <div className="space-y-4">
            <div className="h-[calc(100vh-300px)] w-full relative overflow-hidden rounded-lg">
              <div 
                className="w-full h-full transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `rotateX(45deg) rotateZ(${rotation}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <MapComponent 
                  latitude={currentLocation.latitude} 
                  longitude={currentLocation.longitude} 
                  geofenceRadius={geofenceRadius}
                  zoom={zoom}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Slider
                value={[zoom]}
                min={8}
                max={20}
                step={1}
                onValueChange={(value) => setZoom(value[0])}
                className="w-full mx-4"
              />
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleResetZoom} className="flex-1 mr-2">
                <RotateCcw className="w-4 h-4 mr-2" /> Reset Zoom
              </Button>
              <Button variant="outline" onClick={handleResetLocation} className="flex-1 mx-2">
                <Home className="w-4 h-4 mr-2" /> Reset Location
              </Button>
              <Button variant="outline" onClick={handleRotate} className="flex-1 ml-2">
                <RotateCcw className="w-4 h-4 mr-2" /> Rotate
              </Button>
            </div>
          </div>
        )}
        {showImmersiveView && route && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Immersive Route View</h3>
            <ImmersiveRouteView route={route} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

