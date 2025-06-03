import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import "../css/Style.css";

const Routing = ({ setOpen, setRouteInfo, myLocation, start, destination }) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  const startMarkerRef = useRef(null);

  // Custom Marker-Icon
  const locationIcon = L.divIcon({
    className: 'custom-location-icon',
    html: `
      <div class="outer-circle">
        <div class="inner-circle"></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

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

    const defaultStart = new L.LatLng(myLocation.latitude, myLocation.longitude);
    const startLatLng = start?.lat && start?.lon
      ? new L.LatLng(start.lat, start.lon)
      : defaultStart;

    // Startmarker setzen
    if (startMarkerRef.current) {
      map.removeLayer(startMarkerRef.current);
    }
    L.circleMarker(defaultStart, {
      radius: 8,
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.6,
    }).addTo(map);
    
    L.circleMarker(startLatLng, {
      radius: 8,
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6,
    }).addTo(map);
  
    map.flyTo(startLatLng, 16);


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
      const endLatLng = e.latlng;
      routingControlRef.current.setWaypoints([startLatLng, endLatLng]);
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

    const startLatLng = start?.lat && start?.lon
      ? new L.LatLng(start.lat, start.lon)
      : new L.LatLng(myLocation.latitude, myLocation.longitude);

    const endLatLng = new L.LatLng(destination.lat, destination.lon);

    if (routingControlRef.current) {
      routingControlRef.current.setWaypoints([startLatLng, endLatLng]);
    }
  }, [destination, start, myLocation, setOpen]);

  return null;
};

export default Routing;
