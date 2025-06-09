import React, { useState, useEffect } from 'react';
import "../css/SelectRoute.css";
import { Card, CardContent, List, ListItem } from "framework7-react";

const NominatemRouting = ({ setDestination, setStart, myLocation, destinationCoord }) => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);

  // Fetch für Start
  useEffect(() => {
    if (startPoint.length > 2 && !startCoords) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${startPoint}&format=json`)
        .then((res) => res.json())
        .then((data) => setStartSuggestions(data));
    } else {
      setStartSuggestions([]);
    }
  }, [startPoint, startCoords]);

  // Fetch für Ziel
  useEffect(() => {
    if (endPoint.length > 2 && !endCoords) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${endPoint}&format=json`)
        .then((res) => res.json())
        .then((data) => setEndSuggestions(data));
    } else {
      setEndSuggestions([]);
    }
  }, [endPoint, endCoords]);

  // Auswahl Start
  const handleStartSelect = (location) => {
    setStartPoint(location.display_name);
    const coords = { lat: parseFloat(location.lat), lon: parseFloat(location.lon) };
    setStartCoords(coords);
    setStartSuggestions([]); // Liste schließen
    setStart({ name: location.display_name, lat: coords.lat, lon: coords.lon });
  };

  const handleEndSelect = (location) => {
    setEndPoint(location.display_name);
    const coords = { lat: parseFloat(location.lat), lon: parseFloat(location.lon) };
    setEndCoords(coords);
    setEndSuggestions([]); // Liste schließen
    setDestination({ name: location.display_name, lat: coords.lat, lon: coords.lon });
  };

  return (
    <Card className='RoutingCard'>
      <CardContent className='CardContent'>
        <List className='InputList'>

          {/* Start Input */}
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
              setStartCoords(null);
            }}
          />
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

          {/* End Input */}
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
              setEndCoords(null);
            }}
          />
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
