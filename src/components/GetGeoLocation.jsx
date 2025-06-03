import { useEffect } from 'react';

/// This component retrieves the user's geolocation when mounted
/// and updates the parent component's state via setMyLocation.
const GetGeoLocation = ({ setMyLocation }) => {

    useEffect(() => {
        // Check if the browser supports the Geolocation API
        if (navigator.geolocation) {
            // Attempt to retrieve the user's current position
            navigator.geolocation.getCurrentPosition(
                // On success, update the location state with latitude and longitude
                (position) => {
                    setMyLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null, // No error occurred
                    });
                },
                // On error, update the location state with a null position and an error message
                (error) => {
                    setMyLocation({
                        latitude: null,
                        longitude: null,
                        error: error.message, // Provide the system-generated error
                    });
                }
            );
        } else {
            // If the browser does not support Geolocation, set an appropriate error message
            setMyLocation({
                latitude: null,
                longitude: null,
                error: 'Geolocation is not supported by this browser.',
            });
        }

    // useEffect dependency array includes setMyLocation to avoid unnecessary reruns
    }, [setMyLocation]);

    // This component does not render anything to the UI
    return null;
};

export default GetGeoLocation;
