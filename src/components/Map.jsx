import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Routing from './Routing';
import React, { useState, useEffect } from "react";
import SheetComponent from './SheetComponent';
import GetGeoLocation from './GetGeoLocation';
import NominatemRouting from './SelectRoute';
import { useReverseGeocodeOnRouteInfo } from './ReverseGeocoding';
import { useSearchParams, useNavigate } from 'react-router-dom';

const MapComponent = () => {
  const [isOpen, setOpen] = useState(false);

  const [myLocation, setMyLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
  });

  const [destination, setDestination] = useState(null);
  const [start, setStart] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [destinationCoord, setDestinationCoord] = useState(null);

  const geocodeInfo = useReverseGeocodeOnRouteInfo(routeInfo);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ──────────────────────────────────────────────────────────────
  // A) Read start and end coordinates from URL on app load
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const startParam = searchParams.get('start');
    const endParam = searchParams.get('end');

    if (startParam) {
      const [lat, lon] = startParam.split(',').map(Number);
      if (!isNaN(lat) && !isNaN(lon)) {
        setStart({ lat, lon });
      }
    }

    if (endParam) {
      const [lat, lon] = endParam.split(',').map(Number);
      if (!isNaN(lat) && !isNaN(lon)) {
        setDestination({ lat, lon });
      }
    }
  }, []);

  // ──────────────────────────────────────────────────────────────
  // B) Fallback: use current location if start is not set
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (
      !start &&
      myLocation.latitude &&
      myLocation.longitude
    ) {
      setStart(prev => {
        const currentLat = myLocation.latitude.toFixed(5);
        const currentLon = myLocation.longitude.toFixed(5);
        if (
          !prev ||
          prev.lat.toFixed(5) !== currentLat ||
          prev.lon.toFixed(5) !== currentLon
        ) {
          return {
            lat: myLocation.latitude,
            lon: myLocation.longitude,
            name: "My Location"
          };
        }
        return prev;
      });
    }
  }, [start, myLocation.latitude, myLocation.longitude]);

  // ──────────────────────────────────────────────────────────────
  // C) Update URL when start and destination change
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (start && destination) {
      const startStr = `${start.lat.toFixed(5)},${start.lon.toFixed(5)}`;
      const endStr = `${destination.lat.toFixed(5)},${destination.lon.toFixed(5)}`;

      const currentParams = new URLSearchParams(window.location.search);
      if (
        currentParams.get('start') !== startStr ||
        currentParams.get('end') !== endStr
      ) {
        console.log("Updating URL to:", startStr, endStr);
        navigate(`/?start=${startStr}&end=${endStr}`, { replace: true });
      }
    }
  }, [start, destination, navigate]);

  // ──────────────────────────────────────────────────────────────
  // D) Component rendering
  // ──────────────────────────────────────────────────────────────
  return (
    <>
      <NominatemRouting
        setDestination={setDestination}
        myLocation={myLocation}
        setStart={setStart}
        destinationCoord={destinationCoord}
      />

      <GetGeoLocation setMyLocation={setMyLocation} />

      <SheetComponent
        isOpen={isOpen}
        setOpen={setOpen}
        routeInfo={routeInfo}
        geocodeInfo={geocodeInfo}
      />

      <MapContainer
        center={[47, 9]}
        zoom={10}
        style={{ height: '100vh', width: '100vw' }}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Routing
          setOpen={setOpen}
          setRouteInfo={setRouteInfo}
          myLocation={myLocation}
          destination={destination}
          start={start}
          setDestinationCoord={setDestinationCoord}
          setDestination={setDestination}
        />
      </MapContainer>
    </>
  );
};

export default MapComponent;