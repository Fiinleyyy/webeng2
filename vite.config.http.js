// vite.config.http.js
import { sharedConfig } from './vite.config.js';

export default {
  ...sharedConfig,
  server: {
    ...sharedConfig.server,
    https: false,
    host: true,
    port: 5174,
    open: false,
  },
};
