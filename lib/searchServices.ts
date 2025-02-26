/**
 * Search for services near a location
 * @param location The location to search near
 * @param serviceTypes Array of service types to search for
 * @returns Array of search results
 */
export async function searchServices(location: string, serviceTypes: string[]) {
  try {
    // This is a mock implementation
    // In a real app, this would connect to a service API

    // Generate mock results based on the search criteria
    const results = [];
    const serviceTypeToCategory: Record<string, string> = {
      vet: "veterinary",
      groomer: "pet_grooming",
      park: "dog_park",
      emergency: "animal_hospital",
    };

    // Generate between 1-5 results
    const numResults = Math.floor(Math.random() * 5) + 1;

    // Default coordinates (will be replaced in a real implementation)
    const baseLatitude = 28.6139; // New Delhi
    const baseLongitude = 77.209;

    for (let i = 0; i < numResults; i++) {
      // Get a random service type from the selected ones or default to 'vet'
      const serviceType =
        serviceTypes.length > 0
          ? serviceTypes[Math.floor(Math.random() * serviceTypes.length)]
          : "vet";

      // Create a random offset to make services appear in different locations
      const latOffset = (Math.random() - 0.5) * 0.02;
      const lngOffset = (Math.random() - 0.5) * 0.02;

      // Service name based on the type
      const serviceNames: Record<string, string[]> = {
        vet: [
          "Paws & Claws Vet",
          "Happy Pets Clinic",
          "Animal Care Center",
          "City Veterinary Hospital",
        ],
        groomer: [
          "Fluffy Tails Grooming",
          "Pet Style Studio",
          "Clean Paws",
          "Fur & Fluff",
        ],
        park: [
          "Central Dog Park",
          "Canine Play Area",
          "Bark Park",
          "Waggy Tails Park",
        ],
        emergency: [
          "24/7 Pet Emergency",
          "Animal Emergency Hospital",
          "Critical Care Pets",
          "Emergency Vet Clinic",
        ],
      };

      const randomNameIndex = Math.floor(
        Math.random() * (serviceNames[serviceType]?.length || 4)
      );
      const name =
        serviceNames[serviceType]?.[randomNameIndex] || "Service Center";

      results.push({
        id: i + 1,
        name,
        latitude: baseLatitude + latOffset,
        longitude: baseLongitude + lngOffset,
        address: `${Math.floor(Math.random() * 100) + 1} ${
          ["Main St", "Park Ave", "Broadway", "Green Rd"][
            Math.floor(Math.random() * 4)
          ]
        }, ${location}`,
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
        category: serviceTypeToCategory[serviceType] || "pet_service",
        description: `A highly rated ${serviceType} service for your pet with experienced staff.`,
      });
    }

    // Add a small delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return results;
  } catch (error) {
    console.error("Service Search Error:", error);
    return [];
  }
}
