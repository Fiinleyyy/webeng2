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
root.render(React.createElement(App));

// Initialize notifications
window.addEventListener('load', async () => {
  // Initialize notification service
  const notificationsEnabled = await notificationService.init();

  if (notificationsEnabled) {
    notificationService.sendWelcomeNotification();
    console.log('Notifications initialized successfully');
  } else {
    console.log('Notifications not available or permission denied');
  }

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('✅ Service Worker registered with scope:', registration.scope);
    } catch (err) {
      console.error('❌ Service Worker registration failed:', err);
    }
  } else {
    console.warn('Service Worker not supported in this browser.');
  }
});

