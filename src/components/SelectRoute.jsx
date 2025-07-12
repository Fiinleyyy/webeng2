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
  const [endCoords, setEndCoords] = useState(null);
  const [startInputValue, setStartInputValue] = useState("");
  const [startSuggestionsSearched, setStartSuggestionsSearched] = useState(false);
  const [endInputValue, setEndInputValue] = useState("");
  const [endSuggestionsSearched, setEndSuggestionsSearched] = useState(false);

  // Fetch für Start
  useEffect(() => {
    if (startPoint.length > 0 && !startCoords) {
      console.log("Fetch triggered")
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

  // Fetch für Ziel
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

  // Reagiere auf Koordinaten-Updates (z. B. Klick oder Drag)
  useEffect(() => {
    if (destinationCoord) {
      setEndPoint(`${destinationCoord.lat.toFixed(5)}, ${destinationCoord.lng.toFixed(5)}`);
    }
  }, [destinationCoord]);

  // Auswahl Start
  const handleStartSelect = (location) => {
    setStartSuggestionsSearched(false);
    setStartPoint(location.display_name);
    const coords = { lat: parseFloat(location.lat), lon: parseFloat(location.lon) };
    setStartCoords(coords);
    setStartSuggestions([]);
    setStart({ name: location.display_name, lat: coords.lat, lon: coords.lon });
  };

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
              onChange = {(e) => {
                setStartInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == 'Enter') {
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
