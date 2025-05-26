import React, {useState, useEffect} from 'react';
import "../css/SelectRoute.css";
import { Button,  Card, CardContent, List, ListItem } from "framework7-react";

const NominatemRouting = () => {
    const [startPoint, setStartPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);

    
    useEffect(() => {
        if (startPoint.length >2) {
            fetch(`https://nominatim.openstreetmap.org/search?q=${startPoint}&format=json`)
                .then((response) => response.json())
                .then((data) => setStartSuggestions(data));
        }
        if (endPoint.length >2) {
            fetch(`https://nominatim.openstreetmap.org/search?q=${endPoint}&format=json`)
                .then((response) => response.json())
                .then((data) => setEndSuggestions(data));
        }
    }, [startPoint, endPoint])
    return(
        <Card className='RoutingCard'>
        <CardContent className='CardContent'>
        <List className='InputList'>
            <input
            className='Input'
                type="text"
                placeholder="type in start"
                onChange={(e) => setStartPoint(e.target.value)}
            />
            {startSuggestions.length > 0 && (
            <List>
                {startSuggestions.map((location, index) => (
                    <ListItem 
                        key={index} 
                        title={location.display_name}
                       
                        onClick={() => setStartPoint(location.display_name)}
                    />
                ))}
            </List>
            )}
            <input
                className='Input'
                type="text"
                placeholder="type in end"
                onChange={(e) => setEndPoint(e.target.value)}
            />
            {endSuggestions.length > 0 && (
                <List>
                    {endSuggestions.map((location, index) => (
                        <ListItem 
                            key={index} 
                            title={location.display_name} 
                            onClick={() => setEndPoint(location.display_name)}
                        />
                    ))}
                </List>
            )}
        </List>
        <Button
            className='SearchLocationButton'
        >
            Suchen
        </Button>
        </CardContent>
  </Card>
    )
}

export default NominatemRouting;