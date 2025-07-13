import { useEffect, useState } from 'react';
import { InfoMessage } from './InfoMessages';
import React from 'react';

// In this file the Geolocation of the users current positition using the Geolocation API.
// Result which either is (latitude, longitude, or error) is passed to setMyLocation

const GetGeoLocation = ({setMyLocation}) => {
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        // this gathers the users current position after getting his confirmation that the PWA is allowed to access it
        if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  // set the latitude and longitude of the user as the current Position
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