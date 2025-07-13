import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MapComponent from './Map';
import {
  App
} from 'framework7-react';

const MyApp = () => {
  return (
    <BrowserRouter>
      <App>
        <MapComponent />
      </App>
    </BrowserRouter>
  )
}
export default MyApp;