import { Sheet } from 'react-modal-sheet';
import React from 'react';

const DragSheetMobile = ({ isOpen, setOpen }) => {
  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
      <Sheet.Container style={{ height: "50vh" }}>
        <Sheet.Header />
        <Sheet.Content>
    
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default DragSheetMobile;
