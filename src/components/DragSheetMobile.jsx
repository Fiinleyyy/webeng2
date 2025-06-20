import { Sheet } from 'react-modal-sheet';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "framework7-react";
import { SearchWikipedia } from './WikipediaAPI';
import "../css/DragSheet.css";

const DragSheetMobile = ({ isOpen, setOpen, routeInfo, geocodeInfo }) => {
  const [activeTab, setActiveTab] = useState('route');

  const minimizedHeight = 60;
  const buttonHeight = 30;
  const fullHeight = window.innerHeight * 0.3;

  const [sheetHeight, setSheetHeight] = useState(isOpen ? fullHeight : minimizedHeight - buttonHeight);

  const startY = useRef(null);
  const startHeight = useRef(null);

  useEffect(() => {
    setSheetHeight(isOpen ? fullHeight : minimizedHeight - buttonHeight);
  }, [isOpen]);

  useEffect(() => {
    if (routeInfo) {
      setOpen(true);
    }
  }, [routeInfo, setOpen]);

  const onDragStart = (e) => {
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
    startHeight.current = sheetHeight;
    document.body.style.userSelect = 'none';
  };

  const onDragMove = (e) => {
    if (startY.current === null) return;
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = startY.current - currentY;
    let newHeight = startHeight.current + delta;

    if (newHeight > fullHeight) newHeight = fullHeight;
    if (newHeight < minimizedHeight - buttonHeight) newHeight = minimizedHeight - buttonHeight;

    setSheetHeight(newHeight);
  };

  const onDragEnd = () => {
    document.body.style.userSelect = 'auto';

    if (sheetHeight > (minimizedHeight - buttonHeight + (fullHeight - (minimizedHeight - buttonHeight)) / 2)) {
      setSheetHeight(fullHeight);
      setOpen(true);
    } else {
      setSheetHeight(minimizedHeight - buttonHeight);
      setOpen(false);
    }

    startY.current = null;
    startHeight.current = null;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (startY.current !== null) onDragMove(e);
    };
    const handleMouseUp = () => {
      if (startY.current !== null) onDragEnd();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [sheetHeight]);

  const onSheetClose = () => {
    setOpen(false);
    setSheetHeight(minimizedHeight - buttonHeight);
  };

  return (
    <>
      <Sheet isOpen={true} onClose={onSheetClose}>
        <Sheet.Container
          style={{
            height: sheetHeight,
            width: '100%',
            transition: 'height 0.3s ease',
            overflow: 'hidden',
            overflowX: 'hidden',
            borderTop: '1px solid #ccc',
            position: 'fixed',
            bottom: buttonHeight,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: 'white',
          }}
          onClick={e => e.stopPropagation()}
        >
          <Sheet.Header
            style={{ cursor: 'grab', height: 30 }}
            onMouseDown={onDragStart}
            onTouchStart={onDragStart}
          />
          <Sheet.Content
            style={{
              maxHeight: sheetHeight - 30,
              overflowY: 'auto',
              overflowX: 'hidden',
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
                      <p>
                        Distanz: {routeInfo.distance} km, Zeit: {routeInfo.duration} min
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
                      <SearchWikipedia searchTerm={geocodeInfo.city} />
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

        <Sheet.Backdrop
          onClick={onSheetClose}
          style={{ display: sheetHeight > minimizedHeight - buttonHeight ? 'block' : 'none' }}
        />
      </Sheet>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: buttonHeight,
          backgroundColor: '#eee',
          borderTop: '1px solid #ccc',
          textAlign: 'center',
          lineHeight: `${buttonHeight}px`,
          cursor: 'pointer',
          zIndex: 1001,
          userSelect: 'none',
        }}
        onClick={() => {
          if (sheetHeight === minimizedHeight - buttonHeight) {
            setSheetHeight(fullHeight);
            setOpen(true);
          } else {
            setSheetHeight(minimizedHeight - buttonHeight);
            setOpen(false);
          }
        }}
      >
        {sheetHeight === minimizedHeight - buttonHeight
          ? '↑ Zum Vergrößern ziehen oder klicken'
          : '✕ Schließen'}
      </div>
    </>
  );
};

export default DragSheetMobile;
