import { useEffect, useState } from 'react';

// performs reverse geocoding using OpenStreetMap's Nominatim API.
// Converts geographic coordinates (longitude, latitude) into a human-readable address.

export async function reverseGeocode(longitude, latitude) {
    try {
        // Send a request to the Nominatim reverse geocoding endpoint
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${longitude}&lat=${latitude}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const json = await response.json();
        const pos = json.address;

        const DEFAULT_VALUE = 'Unknown';

        // Extract relevant fields with fallback values
        let city = pos.city ?? pos.town ?? pos.village ?? pos.municipality ?? pos.farm ?? DEFAULT_VALUE;
        let houseNumber = pos.house_number ?? (pos.house_name ? `(${pos.house_name})` : DEFAULT_VALUE);
        let pointOfInterest = pos.historic ?? pos.tourism ?? pos.amenity ?? DEFAULT_VALUE;
        let place = pos.footway ?? pos.locality ?? pos.shop ?? pos.leisure ?? DEFAULT_VALUE;

        // Return a structured object with the address information
        return {
            rawData: json, // Full response for debugging or extended use
            pointOfInterest,
            place,
            street: pos.road || DEFAULT_VALUE,
            houseNumber,
            postalCode: pos.postcode || DEFAULT_VALUE,
            city,
            suburb: pos.suburb || DEFAULT_VALUE,
            county: pos.county || DEFAULT_VALUE,
            state: pos.state || DEFAULT_VALUE,
            country: pos.country || DEFAULT_VALUE,
            countryCode: pos.country_code || DEFAULT_VALUE
        };

    } catch (error) {
        console.error('Error during reverse geocoding:', error);
        return null;
    }
}


 // Custom React hook that performs reverse geocoding based on routeInfo.
 // Automatically runs when the routeInfo (specifically destination) changes.

export function useReverseGeocodeOnRouteInfo(routeInfo) {
    const [geocodeInfo, setGeocodeInfo] = useState(null);

    useEffect(() => {
        // Exit early if no destination is available
        if (!routeInfo?.destination) return;

        // Parse the destination string into latitude and longitude
        const [lat, lng] = routeInfo.destination.split(',').map(Number);

        // Perform reverse geocoding and update state with the result
        reverseGeocode(lng, lat).then(setGeocodeInfo);
    }, [routeInfo]);

    return geocodeInfo;
}
