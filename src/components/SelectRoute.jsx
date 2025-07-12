import React, { useState, useEffect } from 'react';
import "../css/SelectRoute.css";
import { Card, CardContent, List, ListItem } from "framework7-react";
import { Button, Icon } from 'framework7-react';
import { InfoMessage } from './InfoMessages';


// Component for selecting start and destination using Nominatim (OpenStreetMap)
const NominatemRouting = ({ setDestination, setStart, myLocation, destinationCoord }) => {
  const [startPoint, setStartPoint] = useState(""); // Text input for start
  const [endPoint, setEndPoint] = useState("");  // Text input for destination
  const [startSuggestions, setStartSuggestions] = useState([]); // Autocomplete suggestions for start
  const [endSuggestions, setEndSuggestions] = useState([]); // Autocomplete suggestions for destination
  const [startCoords, setStartCoords] = useState(null); // Selected coordinates for start
  const [endCoords, setEndCoords] = useState("Initial");  // Selected coordinates for destination
  const [startInputValue, setStartInputValue] = useState(startPoint || ""); // Manual input value for start
  const [startSuggestionsSearched, setStartSuggestionsSearched] = useState(false); // Tracker whether start value was searched by user
  const [endInputValue, setEndInputValue] = useState(endPoint || ""); // Manual input value for end
  const [endSuggestionsSearched, setEndSuggestionsSearched] = useState(false); // Tracker whether end value was searched by user
  // Fetch für Start
  useEffect(() => {
    if (startPoint.length > 0 && !startCoords) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${startPoint}&format=json`)
        .then((res) => res.json())
        .then((data) => {
          setStartSuggestionsSearched(true);
          setStartSuggestions(data)
        }
        );
    } else {
      setStartSuggestions([]);
    }
  }, [startPoint, startCoords]);

  useEffect(() => {
    setStartInputValue(startPoint || "");
  }, [startPoint]);

  useEffect(() => {
    setEndInputValue(endPoint || "");
  }, [endPoint]);


  // Fetch suggestions for destination input
  useEffect(() => {
    if (endPoint.length > 0 && !endCoords) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${endPoint}&format=json`)
        .then((res) => res.json())
        .then((data) => {
          setEndSuggestionsSearched(true);
          setEndSuggestions(data)
        }
        );
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
    setStartSuggestionsSearched(false); // Start point suggestions not searched yet
    setStartPoint(location.display_name); // Fill input with selected address
    const coords = { lat: parseFloat(location.lat), lon: parseFloat(location.lon) };
    setStartCoords(coords);               // Save selected coordinates
    setStartSuggestions([]);             // Clear suggestion list
    setStart({ name: location.display_name, lat: coords.lat, lon: coords.lon }); // Update parent state
  };

  // Handle selection of a destination from suggestions
  const handleEndSelect = (location) => {
    setEndSuggestionsSearched(false);
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
          <div className='InputRow'>
          <input
              className='Input'
              type="text"
              value={startInputValue}
              placeholder={
                myLocation?.latitude && myLocation?.longitude
                  ? `${myLocation.latitude.toFixed(5)}, ${myLocation.longitude.toFixed(5)}`
                  : "type in start"
              }
              onChange={(e) => {
                const inputValue = e.target.value;
                setStartInputValue(inputValue);

                if (inputValue.trim() === "" && myLocation?.latitude && myLocation?.longitude) {
                  const locationString = `${myLocation.latitude.toFixed(5)}, ${myLocation.longitude.toFixed(5)}`;
                  setStartPoint(locationString);
                  setStartCoords({
                    lat: myLocation.latitude,
                    lon: myLocation.longitude,
                  });
                  setStart({
                    name: "My Location",
                    lat: myLocation.latitude,
                    lon: myLocation.longitude,
                  });
                  setStartSuggestions([]);
                } else if (inputValue.trim() === "") {
                  setStartPoint("");
                  setStartCoords(null);
                  setStartSuggestions([]);
                }
              }}

              onKeyDown={(e) => {
                if (e.key == 'Enter') {
                  setStartPoint(startInputValue);
                  setStartCoords(null); // Reset selected coords to allow new search
                }
              }}
              />
            <Button
              className='SearchButton'
              onClick={() => {
                    setStartPoint(startInputValue);
                    setStartCoords(null);
              }}>
              <Icon f7='search' />
            </Button>

          </div>

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
          {startSuggestionsSearched && startSuggestions.length == 0 && (
            <div className="NoResultsMessage">
              No results found for the entered location.
            </div>
          )}

          <div className='InputRow'>
          {/* Destination input field */}
          <input
              className='Input'
              type="text"
              value={endInputValue}
              placeholder={
                destinationCoord
                  ? `${destinationCoord.lat.toFixed(5)}, ${destinationCoord.lng.toFixed(5)}`
                  : "type in destination"
              }
              onChange={(e) => {
                setEndInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == 'Enter') {
                  setEndPoint(endInputValue);
                  setEndCoords(null); // Reset selected coords to allow new search
                }
              }}
            />
            <Button
              className='SearchButton'
              onClick={() => {
                    setEndPoint(endInputValue);
                    setEndCoords(null);
              }}>
              <Icon f7='search' />
            </Button>

          </div>

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
          {endSuggestionsSearched && endSuggestions.length == 0 && (
            <div className="NoResultsMessage">
              No results found for the entered location.
            </div>
          )}

        </List>
      </CardContent>
    </Card>
  );
};

export default NominatemRouting;
