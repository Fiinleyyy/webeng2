// vite.config.http.js
import { build } from 'vite';
import { sharedConfig } from './vite.config.js';
import { base } from 'motion/react-client';

export default {
  ...sharedConfig,
  root: 'src',
  build: {
    ...sharedConfig.build,
    outDir: 'dist',
  },
  server: {
    ...sharedConfig.server,
    https: false,
    host: true,
    port: 4174,
    open: false,
  },
  base: '/',
};
 