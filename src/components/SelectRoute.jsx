import React, { useState, useEffect } from 'react';
import "../css/SelectRoute.css";
import { Card, CardContent, List, ListItem } from "framework7-react";

// Component for selecting start and destination using Nominatim (OpenStreetMap)
const NominatemRouting = ({ setDestination, setStart, myLocation, destinationCoord }) => {
  const [startPoint, setStartPoint] = useState(""); // Text input for start
  const [endPoint, setEndPoint] = useState("");     // Text input for destination
  const [startSuggestions, setStartSuggestions] = useState([]); // Autocomplete suggestions for start
  const [endSuggestions, setEndSuggestions] = useState([]);     // Autocomplete suggestions for destination
  const [startCoords, setStartCoords] = useState(null); // Selected coordinates for start
  const [endCoords, setEndCoords] = useState(null);     // Selected coordinates for destination

  // Fetch suggestions for start input
  useEffect(() => {
    if (startPoint.length > 2 && !startCoords) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${startPoint}&format=json`)
        .then((res) => res.json())
        .then((data) => setStartSuggestions(data));
    } else {
      setStartSuggestions([]);
    }
  }, [startPoint, startCoords]);

  // Fetch suggestions for destination input
  useEffect(() => {
    if (endPoint.length > 2 && !endCoords) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${endPoint}&format=json`)
        .then((res) => res.json())
        .then((data) => setEndSuggestions(data));
    } else {
      setEndSuggestions([]);
    }
  }, [endPoint, endCoords]);

  // When coordinates change externally (e.g. from map click), update end input field with fitting coordinates to keep the UI up to date with the searched destination
  useEffect(() => {
    if (destinationCoord) {
      setEndPoint(`${destinationCoord.lat.toFixed(5)}, ${destinationCoord.lng.toFixed(5)}`);
    }
  }, [destinationCoord]);

  // Handle selection of a start location from suggestions
  const handleStartSelect = (location) => {
    setStartPoint(location.display_name); // Fill input with selected address
    const coords = { lat: parseFloat(location.lat), lon: parseFloat(location.lon) };
    setStartCoords(coords);               // Save selected coordinates
    setStartSuggestions([]);             // Clear suggestion list
    setStart({ name: location.display_name, lat: coords.lat, lon: coords.lon }); // Update parent state
  };

  // Handle selection of a destination from suggestions
  const handleEndSelect = (location) => {
    setEndPoint(location.display_name);
    const coords = { lat: parseFloat(location.lat), lon: parseFloat(location.lon) };
    setEndCoords(coords);
    setEndSuggestions([]);
    setDestination({ name: location.display_name, lat: coords.lat, lon: coords.lon });
  };

  return (
    <Card className='RoutingCard'>
      <CardContent className='CardContent'>
        <List className='InputList'>
          {/* Start point input field */}
          <input
            className='Input'
            type="text"
            value={startPoint}
            placeholder={
              myLocation?.latitude && myLocation?.longitude
                ? `${myLocation.latitude.toFixed(5)}, ${myLocation.longitude.toFixed(5)}`
                : "type in start"
            }
            onChange={(e) => {
              setStartPoint(e.target.value);
              setStartCoords(null); // Reset selected coords to allow new search
            }}
          />
          {/* Start location suggestions */}
          {startSuggestions.length > 0 && (
            <List>
              {startSuggestions.map((location, index) => (
                <ListItem
                  key={index}
                  title={location.display_name}
                  onClick={() => handleStartSelect(location)}
                />
              ))}
            </List>
          )}

          {/* Destination input field */}
          <input
            className='Input'
            type="text"
            placeholder={
              destinationCoord
                ? `${destinationCoord.lat.toFixed(5)}, ${destinationCoord.lng.toFixed(5)}`
                : "type in destination"
            }
            value={endPoint}
            onChange={(e) => {
              setEndPoint(e.target.value);
              setEndCoords(null); // Reset selected coords to allow new search
            }}
          />
          {/* Destination location suggestions */}
          {endSuggestions.length > 0 && (
            <List>
              {endSuggestions.map((location, index) => (
                <ListItem
                  key={index}
                  title={location.display_name}
                  onClick={() => handleEndSelect(location)}
                />
              ))}
            </List>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default NominatemRouting;
