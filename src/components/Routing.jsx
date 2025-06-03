import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import "../css/Style.css";

const Routing = ({ setOpen, setRouteInfo, myLocation, start, destination }) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  const startMarkerRef = useRef(null);

  // Routing UI verschieben
  const moveRoutingUI = () => {
    const container = document.querySelector('.leaflet-routing-container');
    const target = document.getElementById('leaflet-routing-wrapper');
    if (container && target && !target.contains(container)) {
      target.appendChild(container);
    }
  };

  useEffect(() => {
    if (!myLocation?.latitude || !myLocation?.longitude) return;

    const UsersPosition = new L.LatLng(myLocation.latitude, myLocation.longitude);
    const startPosition = start?.lat && start?.lon
      ? new L.LatLng(start.lat, start.lon)
      : UsersPosition;

    // Startmarker setzen
    if (startMarkerRef.current) {
      map.removeLayer(startMarkerRef.current);
    }
    L.circleMarker(UsersPosition, {
      radius: 8,
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.6,
    }).addTo(map);
    
    L.circleMarker(startPosition, {
      radius: 8,
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6,
    }).addTo(map);
  
    map.flyTo(startPosition, 16);


    // Routing Control initialisieren (nur einmal)
    routingControlRef.current = L.Routing.control({
      show: true,
      fitSelectedRoutes: false,
      plan: false,
      routeWhileDragging: true,
      showAlternatives: true,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.8, weight: 5 }],
      },
      altLineOptions: {
        styles: [{ color: 'blue', opacity: 0.5, weight: 5 }],
      },
    }).on('routesfound', ({ routes, waypoints }) => {
      const summary = routes[0];
      const distance = summary.totalDistance / 1000;
      const duration = Math.round(summary.totalTime / 60);
      const dest = waypoints?.[1]?.latLng;

      setRouteInfo({
        distance: distance.toFixed(2),
        duration,
        destination: `${dest.lat.toFixed(5)}, ${dest.lng.toFixed(5)}`
      });
      setOpen(true);
      setTimeout(moveRoutingUI, 1);
    }).addTo(map);

    // Klicklistener für Routing durch Klick auf die Karte
    const handleClick = (e) => {
      const destinationPosition = e.latlng;
      routingControlRef.current.setWaypoints([startPosition, destinationPosition]);
      setOpen(true);
    };

    map.on('click', handleClick);
    map.on('touchstart', handleClick);

    return () => {
      map.off('click', handleClick);
      map.off('touchstart', handleClick);
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
      if (startMarkerRef.current) {
        map.removeLayer(startMarkerRef.current);
        startMarkerRef.current = null;
      }
    };
  }, [map, myLocation, start, setOpen, setRouteInfo]);

  useEffect(() => {
    if (!destination || !myLocation?.latitude || !myLocation?.longitude) return;

    const startPosition = start?.lat && start?.lon
      ? new L.LatLng(start.lat, start.lon)
      : new L.LatLng(myLocation.latitude, myLocation.longitude);

    const destinationPosition = new L.LatLng(destination.lat, destination.lon);

    if (routingControlRef.current) {
      routingControlRef.current.setWaypoints([startPosition, destinationPosition]);
    }
  }, [destination, start, myLocation, setOpen]);

  return null;
};

export default Routing;
