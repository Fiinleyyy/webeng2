import { Sheet } from 'react-modal-sheet';
import React, { useState } from 'react';
import { Button } from "framework7-react";
import "../css/DragSheet.css";

const DragSheetMobile = ({ isOpen, setOpen, routeInfo }) => {
  const [activeTab, setActiveTab] = useState('route'); // 'route' oder 'info'

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
      <Sheet.Container style={{ height: '50vh', width: '100%' }}>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller>
            {/* Mobile Ansicht mit Buttons zum Wechseln */}
            <div className='SmallScreenLayout shared-layout-padding'>
              <div className='ButtonWrapper'>
                <Button onClick={() => setActiveTab('route')} className='RouteButton'>
                  Routeninformation
                </Button>
                <Button onClick={() => setActiveTab('info')} className='InfoButton'>
                  Wikipediainformation
                </Button>
              </div>
              <div className="TextContent">
                {activeTab === 'route' ? (
                    <>
                        {routeInfo ? (
                            <p style={{ fontWeight: 'bold', fontSize: 22 }}>
                                Distanz: {routeInfo.distance} km, Zeit: {routeInfo.duration} min
                                <br />
                                Koordinaten: {routeInfo.destination}
                            </p>
                        ) : (
                            <p>Bitte auf Karte klicken…</p>
                        )}

                        {/* Hier wird routing-wrapper für kleine Screens hinzugefügt */}
                        <div
                            id="leaflet-routing-wrapper"
                            style={{
                                overflowX: "hidden",
                                width: '100%',
                                display: activeTab === 'route' ? 'block' : 'none',
                            }}
                        />
                    </>
                ) : (
                    <p style={{ fontSize: 18 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                )}
              </div>
            </div>

            {/* Desktop Ansicht mit Wikipedia und Route nebeneinander */}
            <div className='LargeScreenLayout shared-layout-padding'>    
              <div className='LargeScreenRouteInfo' id="leaflet-routing-wrapper">
                {routeInfo ? (
                  <p style={{ fontWeight: 'bold', fontSize: 22 }}>
                    Distanz: {routeInfo.distance} km, Zeit: {routeInfo.duration} min
                    <br />
                    Koordinaten: {routeInfo.destination}
                  </p>
                ) : (
                  <p>Bitte auf Karte klicken…</p>
                )}
              </div>

              <div className='LargeScreenWikipediaInfo'>
                <p style={{ fontWeight: 'bold', fontSize: 22 }}>Wikipedia</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default DragSheetMobile;
