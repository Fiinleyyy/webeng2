// vite.config.https.js
import mkcert from 'vite-plugin-mkcert';
import { sharedConfig } from './vite.config.js';

export default {
  ...sharedConfig,
  plugins: [...(sharedConfig.plugins || []), mkcert()],
  server: {
    ...sharedConfig.server,
    https: true,
    host: true,
    port: 5173,
    open: false,
  },
};
