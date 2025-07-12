// vite.config.https.js
import mkcert from 'vite-plugin-mkcert';
import { sharedConfig } from './vite.config.js';

export default {
  ...sharedConfig,
  root: 'www',
  build: {
    ...sharedConfig.build,
    outDir: 'dist',
  },
  plugins: [...(sharedConfig.plugins || []), mkcert()],
  server: {
    ...sharedConfig.server,
    https: true,
    host: true,
    port: 4173,
    open: false,
  },
};
