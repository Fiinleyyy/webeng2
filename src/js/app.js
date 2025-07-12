// Import React and ReactDOM
import React from 'react';
import { createRoot } from 'react-dom/client';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.jsx';

// Import Notification Service
import notificationService from './notificationService.js';

// Init F7 React Plugin
Framework7.use(Framework7React);

// Mount React App
const root = createRoot(document.getElementById('app'));

// Initialization of service worker
root.render(React.createElement(App));
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registriert mit Scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker Registrierung fehlgeschlagen:', error);
      });
  });
}

// Initialize notifications
window.addEventListener('load', async () => {
  // Initialize the notification service
  const notificationsEnabled = await notificationService.init();

  if (notificationsEnabled) {
    // Send welcome notification
    notificationService.sendWelcomeNotification();
    console.log('Notifications initialized successfully');
  } else {
    console.log('Notifications not available or permission denied');
  }
});
