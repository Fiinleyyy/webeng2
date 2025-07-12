import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Routing from './Routing';
import React, { useState, useEffect } from "react";
import SheetComponent from './SheetComponent';
import GetGeoLocation from './GetGeoLocation';
import NominatemRouting from './SelectRoute';
import { useReverseGeocodeOnRouteInfo } from './ReverseGeocoding';

// Main component where all PWA parts come together

const MapComponent = () => {
  // This state stores information whether the drawer is open or should be opened or closed
  const [isOpen, setOpen] = useState(false);

  // This starte stores information abour the users current location
  const [myLocation, setMyLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
  });

  // This state stores Information about the destination
  const [destination, setDestination] = useState(null);

  // This state stores Information about the start point of a route if it's not the users current position
  const [start, setStart] = useState(null);

  // This state stores information about the calculated route between two points (like distance and time)
  const [routeInfo, setRouteInfo] = useState(null);

  // reverse Geocoding is performed
  const geocodeInfo = useReverseGeocodeOnRouteInfo(routeInfo);

  // This State stores the coordinates of the destination to display them in the destination input field of tge SelectRoute.jsx
  const [destinationCoord, setDestinationCoord] = useState(null);

  // The following code snippet combines all components so a modular structure is given. A deeper description of the single components can be found in the according files
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
        />
      </MapContainer>
    </>
  );
};

export default MapComponent;
