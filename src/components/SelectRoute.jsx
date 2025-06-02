import React, { useState, useEffect } from 'react';
import "../css/SelectRoute.css";
import { Card, CardContent, List, ListItem } from "framework7-react";

const NominatemRouting = ({setDestination, setStart}) => {
    const [startPoint, setStartPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);
    const [startCoords, setStartCoords] = useState(null);
    const [endCoords, setEndCoords] = useState(null);

    useEffect(() => {
        if (startPoint.length > 2 && !startCoords) {
            fetch(`https://nominatim.openstreetmap.org/search?q=${endPoint}&format=json`)
                .then((res) => res.json())
                .then((data) => setStartSuggestions(data));
        } else {
            setStartSuggestions([]);
        }
    }, [startPoint, startCoords]);

    useEffect(() => {
        if (endPoint.length > 2 && !endCoords) {
            fetch(`https://nominatim.openstreetmap.org/search?q=${endPoint}&format=json`)
                .then((res) => res.json())
                .then((data) => setEndSuggestions(data));
        } else {
            setEndSuggestions([]);
        }
    }, [endPoint, endCoords]);

    const handleStartSelect = (location) => {
        setStartPoint(location.display_name);
        const coords = { lat: location.lat, lon: location.lon };
        setStartCoords(coords);
        setStartSuggestions([]);
        console.log("Start Ort:", location.display_name);
        console.log("Start Koordinaten:", coords);
        setStart({ name: location.display_name, lat: coords.lat, lon: coords.lon });
    };

    const handleEndSelect = (location) => {
        setEndPoint(location.display_name);
        const coords = { lat: location.lat, lon: location.lon };
        setEndCoords(coords);
        setEndSuggestions([]);
        console.log("End Ort:", location.display_name);
        console.log("End Koordinaten:", coords);
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
                        placeholder="type in start"
                        value={startPoint}
                        onChange={(e) => {
                            setStartPoint(e.target.value);
                            setStartCoords(null); // Reset Koordinaten, wenn Text geändert wird
                        }}
                    />
                    {startSuggestions.length > 0 && !startCoords && (
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

                    <input
                        className='Input'
                        type="text"
                        placeholder="type in end"
                        value={endPoint}
                        onChange={(e) => {
                            setEndPoint(e.target.value);
                            setEndCoords(null); // Reset Koordinaten, wenn Text geändert wird
                        }}
                    />
                    {endSuggestions.length > 0 && !endCoords && (
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