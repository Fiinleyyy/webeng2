async function reverseGeocode(longitude, latitude) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${longitude}&lat=${latitude}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        const pos = json.address;
        
        const DEFAULT_VALUE = 'Unknown';

        // Process city data from various possible fields
        let city = pos.city ?? pos.town ?? pos.village ?? pos.municipality ?? pos.farm ?? DEFAULT_VALUE;

        // Process house number data
        let houseNumber = pos.house_number ?? (pos.house_name ? `(${pos.house_name})` : DEFAULT_VALUE);

        // Process point of interest data
        let pointOfInterest = pos.historic ?? pos.tourism ?? pos.amenity ?? DEFAULT_VALUE;

        // Process place data
        let place = pos.footway ?? pos.locality ?? pos.shop ?? pos.leisure ?? DEFAULT_VALUE;
            
        // Create a structured result object
        return {
            rawData: json,
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
        throw error;
    }
}
export { reverseGeocode };