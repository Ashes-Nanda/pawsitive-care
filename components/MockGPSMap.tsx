"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

interface MockGPSMapProps {
  latitude: number;
  longitude: number;
  geofenceRadius?: number;
  homeLocation?: { latitude: number; longitude: number } | null; // Add home location
  searchedPlace?: { latitude: number; longitude: number } | null;
  searchResults?: { latitude: number; longitude: number; name: string }[];
  isConnected?: boolean;
  className?: string;
}

// Fix Leaflet marker issue with Next.js by using correct paths
const petIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconSize: [40, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const homeIcon = L.icon({
  iconUrl: "/images/home-icon.png",
  iconSize: [40, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const searchIcon = L.icon({
  iconUrl: "/images/search-icon.png",
  iconSize: [40, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const serviceIcon = L.icon({
  iconUrl: "/images/service-icon.png",
  iconSize: [35, 45],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Helper Component to fix resizing issues safely
const MapResizer = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Delay map invalidation to ensure DOM is ready
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
};

const MockGPSMap: React.FC<MockGPSMapProps> = ({
  latitude,
  longitude,
  geofenceRadius,
  homeLocation = null, // Default to null if not provided
  searchedPlace,
  searchResults = [],
  isConnected = false,
  className,
}) => {
  const [petPosition, setPetPosition] = useState<L.LatLngTuple>([
    latitude,
    longitude,
  ]);
  const [isClient, setIsClient] = useState(false);
  const [mapKey, setMapKey] = useState(`map-${Date.now()}`); // Add a unique key to force remount

  // Ensure component is mounted on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update position when lat/lng props change
  useEffect(() => {
    if (isClient) {
      setPetPosition([latitude, longitude]);
    }
  }, [latitude, longitude, isClient]);

  // Handle connection changes and remount map when connection state changes
  useEffect(() => {
    if (isClient) {
      setMapKey(
        `map-${isConnected ? "connected" : "disconnected"}-${Date.now()}`
      );
    }
  }, [isConnected, isClient]);

  // Simulate pet movement if connected
  useEffect(() => {
    if (!isClient || !isConnected) return;

    const interval = setInterval(() => {
      setPetPosition((prev) => [
        prev[0] + (Math.random() - 0.5) * 0.002,
        prev[1] + (Math.random() - 0.5) * 0.002,
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isConnected, isClient]);

  // Show loading placeholder until client-side rendering is ready
  if (!isClient) {
    return <div className={`${className || "h-[400px] w-full"} bg-gray-200`} />;
  }

  // Determine the center of the geofence
  const geofenceCenter = homeLocation
    ? ([homeLocation.latitude, homeLocation.longitude] as L.LatLngTuple)
    : petPosition;

  return (
    <div
      className={`${
        className || "w-full h-[500px]"
      } rounded-lg overflow-hidden`}
    >
      <MapContainer
        key={mapKey}
        center={petPosition}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <MapResizer />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Geofence Circle - centered at home location if available */}
        {isConnected && typeof geofenceRadius === "number" && (
          <Circle
            center={geofenceCenter}
            radius={geofenceRadius}
            pathOptions={{ color: "red", fillOpacity: 0.2 }}
          />
        )}

        {/* Home Marker - only show if connected and home location is provided */}
        {isConnected && homeLocation && (
          <Marker
            position={[homeLocation.latitude, homeLocation.longitude]}
            icon={homeIcon}
          >
            <Popup>Home Base 🏠</Popup>
          </Marker>
        )}

        {/* Pet's Marker - only show if connected */}
        {isConnected && (
          <Marker position={petPosition} icon={petIcon}>
            <Popup>Your pet is here 🐶</Popup>
          </Marker>
        )}

        {/* Searched Location Marker - always show if available */}
        {searchedPlace && (
          <Marker
            position={[searchedPlace.latitude, searchedPlace.longitude]}
            icon={searchIcon}
          >
            <Popup>Search Location</Popup>
          </Marker>
        )}

        {/* Draw Route to Searched Place - only if connected and place exists */}
        {isConnected && searchedPlace && (
          <Polyline
            positions={[
              petPosition,
              [searchedPlace.latitude, searchedPlace.longitude],
            ]}
            color="blue"
            weight={4}
            dashArray="10, 10"
          />
        )}

        {/* Show Nearby Services - always show search results */}
        {searchResults.map((result, index) => (
          <Marker
            key={`service-${index}`}
            position={[result.latitude, result.longitude]}
            icon={serviceIcon}
          >
            <Popup>{result.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MockGPSMap;
