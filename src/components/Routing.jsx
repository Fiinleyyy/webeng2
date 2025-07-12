import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import "../css/Style.css";

// Routing component using Leaflet Routing Machine.
// Handles routing between a provided start & destination or via map interaction.
const Routing = ({ setOpen, setRouteInfo, myLocation, start, destination, setDestinationCoord }) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  const startMarkerRef = useRef(null);

  // Moves Leaflet's routing UI into a custom container (in the info sheet)
  const moveRoutingUI = () => {
    const container = document.querySelector('.leaflet-routing-container');
    const target = document.getElementById('leaflet-routing-wrapper');
    if (container && target && !target.contains(container)) {
      target.appendChild(container);
    }
  };

  useEffect(() => {
    // If neither myLocation nor a start point is available, do nothing
    if (
      (!myLocation?.latitude || !myLocation?.longitude) &&
      (!start?.lat || !start?.lon)
    ) return;

    const defaultStart = myLocation?.latitude && myLocation?.longitude
      ? new L.LatLng(myLocation.latitude, myLocation.longitude)
      : null;

    const startLatLng = start?.lat && start?.lon
      ? new L.LatLng(start.lat, start.lon)
      : defaultStart;

    if (!startLatLng) return;

    // Remove previous start marker if it exists
    if (startMarkerRef.current) {
      map.removeLayer(startMarkerRef.current);
    }

    // Add a blue circle marker at the start
    startMarkerRef.current = L.circleMarker(startLatLng, {
      radius: 8,
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6,
    }).addTo(map);

    // Move view to start point
    map.flyTo(startLatLng, 14);

    // Setup the routing control
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
      createMarker: function (i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          draggable: false,
        });
      }
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

    // Update destination coordinate if waypoint is changed
    routingControlRef.current.on('waypointschanged', function (e) {
      const newDest = e.waypoints[1]?.latLng;
      if (newDest) {
        setDestinationCoord(newDest);
      }
    });

    // Allow user to click on the map to set a destination
    const handleClick = (e) => {
      const endLatLng = e.latlng;
      routingControlRef.current.setWaypoints([startLatLng, endLatLng]);
      setOpen(true);
      setDestinationCoord(endLatLng);
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
  }, [map, myLocation, start, setOpen, setRouteInfo, setDestinationCoord]);

  // Watch for updates from external inputs (e.g. input fields)
  useEffect(() => {
    if (
      !destination ||
      !Number.isFinite(destination.lat) ||
      !Number.isFinite(destination.lon)
    ) return;

    const startLatLng = start?.lat && start?.lon
      ? new L.LatLng(start.lat, start.lon)
      : (myLocation?.latitude && myLocation?.longitude
        ? new L.LatLng(myLocation.latitude, myLocation.longitude)
        : null);

    if (!startLatLng) return;

    const endLatLng = new L.LatLng(destination.lat, destination.lon);

    if (routingControlRef.current) {
      routingControlRef.current.setWaypoints([]);
      routingControlRef.current.setWaypoints([startLatLng, endLatLng]);
    }
  }, [destination, start, myLocation, setOpen]);

  return null;
};

export default Routing;
