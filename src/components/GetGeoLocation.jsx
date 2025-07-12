import { useEffect, useState } from 'react';
import { InfoMessage } from './InfoMessages';

// In this file the Geolocation of the users current positition using the Geolocation API.
// Result which either is (latitude, longitude, or error) is passed to setMyLocation

const GetGeoLocation = ({setMyLocation}) => {
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setMyLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                  });
                },
                (error) => {
                  // set location latitude and longitude to (0,0) if an error accurs
                  setMyLocation({
                    latitude: null,
                    longitude: null,
                    error: error.message,
                  });
                  setLocationError(error.message);
                }
              );
            } else {
              const errorMessage = 'Geolocation is not supported by this browser.';
              setMyLocation({
                latitude: null,
                longitude: null,
                error: errorMessage,
              });
              setLocationError(errorMessage);
            };

    },[setMyLocation])
    return locationError ? <InfoMessage message={locationError}/> : null;
}

export default GetGeoLocation;