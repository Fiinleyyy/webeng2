import { Sheet } from 'react-modal-sheet';
import React, { useState, useEffect } from 'react';
import { Button } from "framework7-react";
import { SearchWikipedia } from './WikipediaAPI';
import "../css/SheetComponent.css";

// A bottom sheet component that shows route info and a Wikipedia tab
const SheetComponent = ({ isOpen, setOpen, routeInfo, geocodeInfo }) => {
  const [activeTab, setActiveTab] = useState('route'); // Active tab: 'route' or 'info'
  
  const minimizedHeight = 0; // Height when sheet is closed
  const fullHeight = window.innerHeight * 0.3; // Sheet height when opened (30% of screen)

  const [sheetHeight, setSheetHeight] = useState(isOpen ? fullHeight : minimizedHeight);

  // Adjust sheet height when `isOpen` changes
  useEffect(() => {
    setSheetHeight(isOpen ? fullHeight : minimizedHeight);
  }, [isOpen]);

  // Automatically open the sheet when new route info is available
  useEffect(() => {
    if (routeInfo) {
      setOpen(true);
    }
  }, [routeInfo, setOpen]);

  // Close the sheet and reset height
  const onSheetClose = () => {
    setOpen(false);
    setSheetHeight(minimizedHeight);
  };

  return (
    <>
      {/* Bottom sheet component from react-modal-sheet */}
      <Sheet isOpen={true} onClose={onSheetClose} disableDrag={true}>
        
        {/* Main container for the sheet content */}
        <Sheet.Container
          className="SheetContainer"
          style={{ height: sheetHeight }}
          onClick={e => e.stopPropagation()} // Prevent clicks from bubbling
        >
          {/* Header with close button */}
          <Sheet.Header className="SheetHeader">
            <button className="CloseButton" onClick={onSheetClose}>
              ✕
            </button>
          </Sheet.Header>

          {/* Main content area */}
          <Sheet.Content
            className="SheetContent"
            style={{ maxHeight: sheetHeight - 40 }} // Adjust height minus header
          >
            <div className='SmallScreenLayout shared-layout-padding'>

              {/* Toggle buttons for tabs */}
              <div className='ButtonWrapper'>
                <Button onClick={() => setActiveTab('route')} className='RouteButton'>
                  Route
                </Button>
                <Button onClick={() => setActiveTab('info')} className='InfoButton'>
                  Wikipedia
                </Button>
              </div>

              {/* Content changes based on active tab */}
              <div className="TextContent">
                {activeTab === 'route' ? (
                  <>
                    {/* Route tab content is mostly handled by the routing wrapper below */}
                  </>
                ) : (
                  <>
                    {/* Show Wikipedia info if geocode city is available */}
                    {geocodeInfo?.city ? (
                      <SearchWikipedia searchTerm={geocodeInfo.city} />
                    ) : (
                      <p>Loading Wikipedia article…</p>
                    )}
                  </>
                )}

                {/* Leaflet routing control gets inserted here by JS */}
                <div
                  id="leaflet-routing-wrapper"
                  className={activeTab === 'route' ? 'routing-visible' : 'routing-hidden'}
                />
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>

        {/* Backdrop behind the sheet (closes sheet when clicked) */}
        <Sheet.Backdrop
          onClick={onSheetClose}
          style={{ display: isOpen ? 'block' : 'none' }}
        />
      </Sheet>

      {/* Small button to reopen the sheet if it is closed */}
      {!isOpen && (
        <div className="Button_Opening_Sheet" onClick={() => {
          setSheetHeight(fullHeight);
          setOpen(true);
        }}>
          ↑ show information
        </div>
      )}
    </>
  );
};

export default SheetComponent;
