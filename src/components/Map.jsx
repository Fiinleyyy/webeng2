import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Routing from './Routing';
import React, { useState } from "react";
import DragSheetMobile from './DragSheetMobile';
import GetGeoLocation from './GetGeoLocation';
import NominatemRouting from './SelectRoute';
import { useReverseGeocodeOnRouteInfo } from './ReverseGeocoding';

const MapComponent = () => {
  const [isOpen, setOpen] = useState(false);
  const [myLocation, setMyLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
  });
  const [destination, setDestination] = useState(null);
  const [start, setStart] = useState(null);
  const position = [52.520007, 13.404954];
  const [routeInfo, setRouteInfo] = useState(null);

  // 🔄 Automatisches Reverse-Geocoding
  const geocodeInfo = useReverseGeocodeOnRouteInfo(routeInfo);

  return (
    <>
      <NominatemRouting setDestination={setDestination} setStart={setStart} />
      <GetGeoLocation setMyLocation={setMyLocation} />
      <DragSheetMobile
        isOpen={isOpen}
        setOpen={setOpen}
        routeInfo={routeInfo}
        geocodeInfo={geocodeInfo} // ✅ Stadtinfo fürs Wikipedia-Modul
      />
      <MapContainer
        center={position}
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
        />
      </MapContainer>
    </>
  );
};

export default MapComponent;
