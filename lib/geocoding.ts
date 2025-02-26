/**
 * Geocodes a location string to coordinates
 * @param location The location to geocode
 * @returns An object with latitude and longitude
 */
export async function geocodeLocation(location: string) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      return null; // No results found
    }

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      city:
        data[0].address?.city ||
        data[0].address?.town ||
        data[0].address?.village ||
        "",
    };
  } catch (error) {
    console.error("Geocoding Error:", error);
    return null;
  }
}

/**
 * Gets location details from coordinates
 * @param lat Latitude
 * @param lon Longitude
 * @returns Location details including city name
 */
export async function reverseGeocode(lat: number, lon: number) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();

    if (!data || data.error) {
      return null;
    }

    return {
      city:
        data.address?.city || data.address?.town || data.address?.village || "",
      address: data.display_name,
    };
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);
    return null;
  }
}
