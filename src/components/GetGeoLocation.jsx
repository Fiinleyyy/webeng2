import { useEffect } from 'react';

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