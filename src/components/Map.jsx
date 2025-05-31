import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Routing from './Routing';
import React, {useState} from "react";
import DragSheetMobile from './DragSheetMobile';
import GetGeoLocation from './GetGeoLocation';
import NominatemRouting from './SelectRoute';


const MapComponent = () => {
  const [isOpen, setOpen] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [myLocation, setMyLocation] = useState({
          latitude: null,
          longitude: null,
          error: null
      })
  const position = [52.520007, 13.404954]
  return (
    <>
   <NominatemRouting/>
   <GetGeoLocation setMyLocation={setMyLocation}/>
   <DragSheetMobile isOpen={isOpen} setOpen={setOpen} routeInfo={routeInfo}/>
    <MapContainer
      center={position}
      zoom={10}
      style={{ height: '100vh', width: '100vw' }}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
     
      <Routing setOpen={setOpen} setRouteInfo={setRouteInfo} myLocation={myLocation}/>
      
   
    </MapContainer> 
    
    </>
  )
}
export default MapComponent