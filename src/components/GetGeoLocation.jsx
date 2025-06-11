import { useEffect } from 'react';

// In this file the Geolocation of the users current positition using the Geolocation API.
// Result which either is (latitude, longitude, or error) is passed to setMyLocation

const GetGeoLocation = ({setMyLocation}) => {
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
                  setMyLocation({
                    latitude: null,
                    longitude: null,
                    error: error.message,
                  });
                }
              );
            } else {
              setMyLocation({
                latitude: null,
                longitude: null,
                error: 'Geolocation is not supported by this browser.',
              });
            };

    },[setMyLocation])
    return null;
}

export default GetGeoLocation;