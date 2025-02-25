"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

interface MockGPSMapProps {
  latitude: number;
  longitude: number;
  geofenceRadius?: number;
}

// ✅ Fix Leaflet marker issue with Next.js
const markerIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// ✅ Map Resizer Component
const MapResizer = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize(); // ✅ Properly invalidate map size after mounting
    }, 300);
  }, [map]);

  return null;
};

const MockGPSMap: React.FC<MockGPSMapProps> = ({
  latitude,
  longitude,
  geofenceRadius,
}) => {
  const [position, setPosition] = useState<L.LatLngTuple>([
    latitude,
    longitude,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => [
        prev[0] + (Math.random() - 0.5) * 0.002,
        prev[1] + (Math.random() - 0.5) * 0.002,
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, [latitude, longitude]);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <MapContainer
        key={`${latitude}-${longitude}-${geofenceRadius}`} // ✅ Force re-mounting
        center={position}
        zoom={15}
        className="w-full h-full"
      >
        <MapResizer /> {/* ✅ Ensures correct resizing */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geofenceRadius && (
          <Circle
            center={position}
            radius={geofenceRadius}
            pathOptions={{ color: "red", fillOpacity: 0.2 }}
          />
        )}
        <Marker position={position} icon={markerIcon}>
          <Popup>Your pet is here 🐶</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MockGPSMap;
