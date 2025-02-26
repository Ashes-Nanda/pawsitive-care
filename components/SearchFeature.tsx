import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import SearchResults from "./SearchResults"; // Import the SearchResults component
import dynamic from "next/dynamic";
import { geocodeLocation } from "@/lib/geocoding"; // Import the real geocoding function

// ✅ Dynamically import MockGPSMap to prevent SSR issues
const MockGPSMap = dynamic(() => import("./MockGPSMap"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-200"></div>,
});

interface PetLocation {
  latitude: number;
  longitude: number;
  city: string;
}

interface SearchFeatureProps {
  petLocation: PetLocation;
  isConnected: boolean;
  onSearchUpdate: (
    place: { latitude: number; longitude: number } | null,
    results: any[]
  ) => void;
}

const serviceTypes = [
  { id: "vet", label: "Veterinarian" },
  { id: "groomer", label: "Groomer" },
  { id: "park", label: "Dog Park" },
  { id: "emergency", label: "Emergency Service" },
];

// Real service type mappings for OpenStreetMap amenities
const serviceTypeToAmenity = {
  vet: "veterinary",
  groomer: "pet_grooming",
  park: "dog_park",
  emergency: "animal_boarding",
};

// Function to search for services using OpenStreetMap Overpass API
const searchServices = async (
  latitude: number,
  longitude: number,
  serviceTypes: string[]
) => {
  try {
    // Default to vet search if no service type selected
    const amenities =
      serviceTypes.length > 0
        ? serviceTypes
            .map(
              (type) =>
                serviceTypeToAmenity[
                  type as keyof typeof serviceTypeToAmenity
                ] || "veterinary"
            )
            .join("|")
        : "veterinary";

    // Create Overpass query
    const radius = 5000; // 5km radius
    const query = `
      [out:json];
      (
        node["amenity"~"${amenities}"](around:${radius},${latitude},${longitude});
        way["amenity"~"${amenities}"](around:${radius},${latitude},${longitude});
        relation["amenity"~"${amenities}"](around:${radius},${latitude},${longitude});
      );
      out center;
    `;

    // Using a CORS proxy or direct request might be needed in production
    // For demo purposes, we'll still use mock data but make it more realistic

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create mock results based on real service types with realistic coordinates
    // This simulates what we would get from the Overpass API
    const results = [];
    const numResults = Math.floor(Math.random() * 4) + 1;

    for (let i = 0; i < numResults; i++) {
      // Generate location within 3km of the search point
      const randomDistance = Math.random() * 0.03;
      const randomAngle = Math.random() * Math.PI * 2;
      const newLat = latitude + randomDistance * Math.cos(randomAngle);
      const newLng = longitude + randomDistance * Math.sin(randomAngle);

      const serviceType =
        serviceTypes.length > 0
          ? serviceTypes[Math.floor(Math.random() * serviceTypes.length)]
          : "vet";

      // Generate realistic names based on service type
      const names: Record<string, string[]> = {
        vet: [
          "Paws & Claws Vet",
          "Happy Pets Clinic",
          "Delhi Pet Hospital",
          "Animal Care Center",
        ],
        groomer: [
          "Fluffy Tails Grooming",
          "Pet Style Studio",
          "Pampered Paws",
          "Fuzzy Friends Grooming",
        ],
        park: [
          "Central Dog Park",
          "Canine Play Area",
          "Bark Park Delhi",
          "Paws Paradise",
        ],
        emergency: [
          "24/7 Pet Emergency",
          "Animal Emergency Hospital",
          "Delhi Pet ER",
          "Critical Care Pets",
        ],
      };

      const randomName =
        names[serviceType]?.[
          Math.floor(Math.random() * names[serviceType].length)
        ] || "Pet Service";

      results.push({
        id: i,
        name: randomName,
        latitude: newLat,
        longitude: newLng,
        address: `${Math.floor(Math.random() * 100) + 1} ${
          ["Main St", "Park Road", "Gandhi Ave", "Delhi Way"][
            Math.floor(Math.random() * 4)
          ]
        }, New Delhi`,
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        description: `A great ${serviceType} service for your pet.`,
        serviceType,
      });
    }

    return results;
  } catch (error) {
    console.error("Error searching for services:", error);
    return [];
  }
};

export default function SearchFeature({
  petLocation,
  isConnected,
  onSearchUpdate,
}: SearchFeatureProps) {
  const [location, setLocation] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchedPlace, setSearchedPlace] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mapKey, setMapKey] = useState(`search-map-${Date.now()}`);

  // Set the default location based on pet's city
  useEffect(() => {
    if (petLocation && petLocation.city) {
      setLocation(petLocation.city);
    }
  }, [petLocation]);

  // Update parent component when search results or place changes
  useEffect(() => {
    onSearchUpdate(searchedPlace, searchResults);
  }, [searchedPlace, searchResults, onSearchUpdate]);

  // Force map remount when connection state changes
  useEffect(() => {
    setMapKey(
      `search-map-${isConnected ? "connected" : "disconnected"}-${Date.now()}`
    );
  }, [isConnected]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Ensure search is within the pet's city
      const searchLocation = location
        ? `${location}, ${petLocation.city}`
        : petLocation.city;

      // Use real geocoding function
      const geoData = await geocodeLocation(searchLocation);

      if (!geoData) {
        setError("Location not found.");
        setSearchedPlace(null);
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      const { latitude, longitude } = geoData;
      setSearchedPlace({ latitude, longitude });

      // Search for services near the geocoded location
      const results = await searchServices(
        latitude,
        longitude,
        selectedServices
      );
      setSearchResults(results);

      if (results.length === 0) {
        setError("No services found in your area.");
      }
    } catch (err) {
      setError("Unable to retrieve data. Please try again.");
      toast({
        title: "Error",
        description: "Failed to fetch search results. Please try again.",
        variant: "destructive",
      });
      setSearchedPlace(null);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="location">Location (in {petLocation.city})</Label>
        <div className="flex space-x-2">
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={`Enter location in ${petLocation.city}`}
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Service Types</Label>
        <div className="flex flex-wrap gap-4">
          {serviceTypes.map((service) => (
            <div key={service.id} className="flex items-center space-x-2">
              <Checkbox
                id={service.id}
                checked={selectedServices.includes(service.id)}
                onCheckedChange={() => handleServiceToggle(service.id)}
              />
              <Label htmlFor={service.id}>{service.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="h-[400px] border rounded-lg overflow-hidden">
        <MockGPSMap
          key={mapKey}
          latitude={petLocation.latitude}
          longitude={petLocation.longitude}
          searchedPlace={searchedPlace}
          searchResults={searchResults}
          isConnected={isConnected}
        />
      </div>

      {/* Show search results as cards below the map */}
      {searchResults.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <SearchResults results={searchResults} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
