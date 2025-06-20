import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Routing from './Routing';
import React, { useState, useEffect } from "react";
import DragSheetMobile from './DragSheetMobile';
import GetGeoLocation from './GetGeoLocation';
import NominatemRouting from './SelectRoute';
import { useReverseGeocodeOnRouteInfo } from './ReverseGeocoding';

// Main component where all PWA parts come together

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
  const geocodeInfo = useReverseGeocodeOnRouteInfo(routeInfo);
  const [destinationCoord, setDestinationCoord] = useState(null);


  return (
    <>
      <NominatemRouting
        setDestination={setDestination}
        myLocation={myLocation}
        setStart={setStart}
        destinationCoord={destinationCoord}
      />
      <GetGeoLocation setMyLocation={setMyLocation} />
      <DragSheetMobile
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
