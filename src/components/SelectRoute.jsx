import React, { useState, useEffect } from 'react';
import "../css/SelectRoute.css";
import { Card, CardContent, List, ListItem } from "framework7-react";
import { Button, Icon } from 'framework7-react';
import { InfoMessage } from './InfoMessages';

const NominatemRouting = ({ setDestination, setStart, myLocation, destinationCoord }) => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState("Initial");

  const [startInputValue, setStartInputValue] = useState(startPoint || "");
  const [startSuggestionsSearched, setStartSuggestionsSearched] = useState(false);

  const [endInputValue, setEndInputValue] = useState(endPoint || "");
  const [endSuggestionsSearched, setEndSuggestionsSearched] = useState(false);

  // Flag to skip search if destinationCoord updates the input field (e.g., after map click)
  const [skipEndSearch, setSkipEndSearch] = useState(false);

  // Fetch suggestions for start location input
  useEffect(() => {
    if (startPoint.length > 0 && !startCoords) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${startPoint}&format=json`)
        .then((res) => res.json())
        .then((data) => {
          setStartSuggestionsSearched(true);
          setStartSuggestions(data);
        });
    } else {
      setStartSuggestions([]);
    }
  }, [startPoint, startCoords]);

  // Sync input display with internal state
  useEffect(() => {
    setStartInputValue(startPoint || "");
  }, [startPoint]);

  useEffect(() => {
    setEndInputValue(endPoint || "");
  }, [endPoint]);

  // Fetch suggestions for destination input (unless flagged to skip)
  useEffect(() => {
    if (endPoint.length > 0 && !endCoords && !skipEndSearch) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${endPoint}&format=json`)
        .then((res) => res.json())
        .then((data) => {
          setEndSuggestionsSearched(true);
          setEndSuggestions(data);
        });
    } else {
      setEndSuggestions([]);
    }

    // Reset the skip flag so it's only skipped once
    if (skipEndSearch) {
      setSkipEndSearch(false);
    }
  }, [endPoint, endCoords, skipEndSearch]);

  // When destinationCoord (from map click) changes, update input field but skip auto-search
  useEffect(() => {
    if (destinationCoord) {
      const formatted = `${destinationCoord.lat.toFixed(5)}, ${destinationCoord.lng.toFixed(5)}`;
      if (formatted !== endPoint) {
        setEndPoint(formatted);
        setSkipEndSearch(true); // prevent Nominatim fetch triggered by this input change
      }
    }
  }, [destinationCoord]);

  // Handle selecting a start suggestion
  const handleStartSelect = (location) => {
    setStartSuggestionsSearched(false);
    setStartPoint(location.display_name);
    const coords = { lat: parseFloat(location.lat), lon: parseFloat(location.lon) };
    setStartCoords(coords);
    setStartSuggestions([]);
    setStart({ name: location.display_name, lat: coords.lat, lon: coords.lon });
  };

  // Handle selecting a destination suggestion
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

          {/* Start input field */}
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
                  // Use current location if field is cleared
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
                if (e.key === 'Enter') {
                  setStartPoint(startInputValue);
                  setStartCoords(null);
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

          {/* Start suggestions list */}
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
          {startSuggestionsSearched && startSuggestions.length === 0 && (
            <div className="NoResultsMessage">No results found for the entered location.</div>
          )}

          {/* Destination input field */}
          <div className='InputRow'>
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
                if (e.key === 'Enter') {
                  setEndPoint(endInputValue);
                  setEndCoords(null);
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

          {/* Destination suggestions list */}
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
          {endSuggestionsSearched && endSuggestions.length === 0 && (
            <div className="NoResultsMessage">No results found for the entered location.</div>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default NominatemRouting;
