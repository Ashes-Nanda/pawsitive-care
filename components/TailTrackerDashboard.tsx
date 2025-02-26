"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Battery, Activity, Clock, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import GeofenceSetup from "./GeofenceSetup";
import { ConnectTailTrackerButton } from "./ConnectTailTrackerButton";
import SearchFeature from "./SearchFeature";

// ✅ Lazy load MockGPSMap to prevent SSR issues
const MockGPSMap = dynamic(() => import("@/components/MockGPSMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gray-200 flex items-center justify-center">
      Loading map...
    </div>
  ),
});

const mockTailTrackerData = {
  latitude: 28.6139, // New Delhi latitude
  longitude: 77.209, // New Delhi longitude
  batteryLevel: 75, // Default battery
  lastUpdate: new Date().toISOString(),
  activityLevel: "Moderate",
  city: "New Delhi", // Added city information
};

export default function TailTrackerDashboard() {
  const [trackerData, setTrackerData] = useState(mockTailTrackerData);
  const [homeLocation, setHomeLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [geofenceRadius, setGeofenceRadius] = useState<number | null>(null);
  const [isOutsideGeofence, setIsOutsideGeofence] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // ✅ Toggle state
  const [searchedPlace, setSearchedPlace] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [mapKey, setMapKey] = useState(`main-map-${Date.now()}`);

  // Force map remount when connection state changes
  useEffect(() => {
    setMapKey(
      `main-map-${isConnected ? "connected" : "disconnected"}-${Date.now()}`
    );
  }, [isConnected]);

  // Set home location when first connected
  useEffect(() => {
    if (isConnected && !homeLocation) {
      setHomeLocation({
        latitude: trackerData.latitude,
        longitude: trackerData.longitude,
      });
    }
  }, [isConnected, homeLocation, trackerData]);

  useEffect(() => {
    if (!isConnected) return; // ✅ Updates only when connected

    const interval = setInterval(() => {
      const newLatitude = trackerData.latitude + (Math.random() - 0.5) * 0.01;
      const newLongitude = trackerData.longitude + (Math.random() - 0.5) * 0.01;

      setTrackerData((prevData) => ({
        ...prevData,
        latitude: newLatitude,
        longitude: newLongitude,
        lastUpdate: new Date().toISOString(),
        batteryLevel: Math.max(0, prevData.batteryLevel - 1), // ✅ Battery drains when connected
        activityLevel: ["Low", "Moderate", "High"][
          Math.floor(Math.random() * 3)
        ] as "Low" | "Moderate" | "High",
      }));

      if (geofenceRadius && homeLocation) {
        const distance = calculateDistance(
          homeLocation.latitude,
          homeLocation.longitude,
          newLatitude,
          newLongitude
        );
        const newIsOutsideGeofence = distance > geofenceRadius / 1000;
        if (newIsOutsideGeofence && !isOutsideGeofence) {
          toast({
            title: "Geofence Alert",
            description: "Your pet has left the designated safe area!",
            variant: "destructive",
          });
        }
        setIsOutsideGeofence(newIsOutsideGeofence);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [
    isConnected,
    trackerData.latitude,
    trackerData.longitude,
    geofenceRadius,
    isOutsideGeofence,
    homeLocation,
  ]);

  const handleSaveGeofence = (radius: number) => {
    setGeofenceRadius(radius);
    toast({
      title: "Geofence Updated",
      description: `New geofence radius set to ${radius} meters.`,
    });
  };

  // Reset connection state and home location when disconnected
  const handleConnectToggle = (connected: boolean) => {
    setIsConnected(connected);
    if (!connected) {
      // Keep home location when disconnecting
      setIsOutsideGeofence(false);
    }
  };

  // Handler for search results and searched place
  const handleSearchUpdate = (
    place: { latitude: number; longitude: number } | null,
    results: any[]
  ) => {
    setSearchedPlace(place);
    setSearchResults(results);
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <motion.div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* ✅ Left Panel (Dashboard) */}
      <motion.div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.h1 className="text-3xl font-bold text-emerald-400 neon">
            TailTracker Dashboard
          </motion.h1>

          {/* ✅ Toggle Connection */}
          <motion.div>
            <ConnectTailTrackerButton onConnectToggle={handleConnectToggle} />
          </motion.div>

          {isOutsideGeofence && (
            <motion.div>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Geofence Alert</AlertTitle>
                <AlertDescription>
                  Your pet has left the designated safe area!
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* ✅ Display Cards */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Battery className="mr-2 inline" /> Battery
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isConnected ? `${trackerData.batteryLevel}%` : "N/A"}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Activity className="mr-2 inline" /> Activity Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isConnected ? trackerData.activityLevel : "Inactive"}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Clock className="mr-2 inline" /> Last Update
                </CardTitle>
              </CardHeader>
              <CardContent>
                {new Date(trackerData.lastUpdate).toLocaleString()}
              </CardContent>
            </Card>
          </motion.div>

          <GeofenceSetup onSave={handleSaveGeofence} />

          {/* ✅ Search Feature */}
          <motion.div>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Search Nearby Services</CardTitle>
              </CardHeader>
              <CardContent>
                <SearchFeature
                  petLocation={trackerData}
                  isConnected={isConnected}
                  onSearchUpdate={handleSearchUpdate}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* ✅ Right Panel (Map) */}
      <motion.div className="w-full lg:w-1/2 lg:min-w-[500px] p-4 bg-zinc-100 dark:bg-zinc-800 overflow-y-auto h-full">
        {!isConnected ? (
          <div className="flex justify-center items-center h-[500px]">
            <Image
              src="/images/placeholder.jpg"
              alt="Map Placeholder"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        ) : (
          <div className="h-[500px] rounded-lg overflow-hidden">
            <MockGPSMap
              key={mapKey}
              latitude={trackerData.latitude}
              longitude={trackerData.longitude}
              homeLocation={homeLocation}
              geofenceRadius={geofenceRadius || undefined}
              isConnected={isConnected}
              searchedPlace={searchedPlace}
              searchResults={searchResults}
              className="w-full h-full"
            />
          </div>
        )}

        {/* ✅ Mock GPS Tracking Details */}
        {isConnected && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-900 shadow rounded-lg">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              GPS Tracking Details
            </h2>
            <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                📶 <strong>Signal Strength:</strong> Good
              </li>
              <li>
                ⏱️ <strong>Last Updated:</strong>{" "}
                {new Date(trackerData.lastUpdate).toLocaleTimeString()}
              </li>
              <li>
                🚀 <strong>Current Speed:</strong>{" "}
                {(Math.random() * 5 + 2).toFixed(2)} km/h
              </li>
              <li>
                📍 <strong>Location Accuracy:</strong> ±
                {(Math.random() * 10 + 5).toFixed(1)} meters
              </li>
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
