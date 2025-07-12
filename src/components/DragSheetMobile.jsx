import { Sheet } from 'react-modal-sheet';
import React, { useState, useEffect } from 'react';
import { Button } from "framework7-react";
import { SearchWikipedia } from './WikipediaAPI';
import "../css/DragSheet.css";

// In this component the DragSheet which displays the Information abput the Route and the Wikipedia Article
// It opens up by searching any destination either by using the input fields or clicking in the map

const DragSheetMobile = ({ isOpen, setOpen, routeInfo, geocodeInfo }) => {
  const [activeTab, setActiveTab] = useState('route');
  const minimizedHeight = 0;
  const fullHeight = window.innerHeight * 0.3;

  // If the State switches to "open" triggered by searching a destination, the Sheet takes place on the 30% of the bottom of the map, otherwise it is closed
  const [sheetHeight, setSheetHeight] = useState(isOpen ? fullHeight : minimizedHeight);

  useEffect(() => {
    setSheetHeight(isOpen ? fullHeight : minimizedHeight);
  }, [isOpen]);

  useEffect(() => {
    if (routeInfo) {
      setOpen(true);
    }
  }, [routeInfo, setOpen]);

  const onSheetClose = () => {
    setOpen(false);
    setActiveTab('route');
    setSheetHeight(minimizedHeight);
  };

  return (
    <>
      <Sheet isOpen={true} onClose={onSheetClose} disableDrag={true}>
        <Sheet.Container
          style={{
            height: sheetHeight,
            width: '100%',
            transition: 'height 0.3s ease',
            overflow: 'hidden',
            borderTop: '1px solid #ccc',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: 'white',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header with closing button */}
          <Sheet.Header
            style={{
              height: 40,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '0 10px',
              borderBottom: '1px solid #ddd'
            }}
          >
            <button onClick={onSheetClose} style={{
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer'
            }}>
              ✕
            </button>
          </Sheet.Header>

          <Sheet.Content
            style={{
              maxHeight: sheetHeight - 40,
              overflowY: 'auto',
              padding: '10px',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div className='SmallScreenLayout shared-layout-padding'>
              <div className='ButtonWrapper'>
                <Button onClick={() => setActiveTab('route')} className='RouteButton'>
                  Route
                </Button>
                <Button onClick={() => setActiveTab('info')} className='InfoButton'>
                  Wikipedia
                </Button>
              </div>
              <div className="TextContent">
                {activeTab === 'route' ? (
                  <>
                    {routeInfo ? (
                      console.log(geocodeInfo),
                      <p>
                        Distanz: {geocodeInfo.city} km, Zeit: {routeInfo.duration} min
                        <br />
                        Koordinaten: {routeInfo.destination}
                      </p>
                    ) : (
                      <p>Bitte auf Karte klicken…</p>
                    )}
                  </>
                ) : (
                  <>
                    {geocodeInfo?.city ? (
                      <SearchWikipedia searchTerm={geocodeInfo.city} isSheetOpen={isOpen}/>
                    ) : (
                      <p>Wikipedia-Artikel wird geladen…</p>
                    )}
                  </>
                )}

                <div
                  id="leaflet-routing-wrapper"
                  className={activeTab === 'route' ? 'routing-visible' : 'routing-hidden'}
                />
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        {/* Only show this when Sheet is open */}
        <Sheet.Backdrop
          onClick={onSheetClose}
          style={{ display: isOpen ? 'block' : 'none' }}
        />
      </Sheet>

      {/* fixed button at the bottom to open up the Sheet */}
      {!isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            backgroundColor: '#eee',
            borderTop: '1px solid #ccc',
            textAlign: 'center',
            lineHeight: '40px',
            cursor: 'pointer',
            zIndex: 1001,
            userSelect: 'none',
            fontWeight: 'bold',
          }}
          onClick={() => {
            setSheetHeight(fullHeight);
            setOpen(true);
          }}
        >
          ↑ Informationen anzeigen
        </div>
      )}
    </>
  );
};

export default DragSheetMobile;
