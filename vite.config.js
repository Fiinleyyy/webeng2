import path from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';


const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www');


export default {
  plugins: [
    react(),
    mkcert()
  ],
  root: SRC_DIR,
  base: './', // Relativer Pfad notwendig für SW und PWA
  publicDir: PUBLIC_DIR,
  build: {
    outDir: BUILD_DIR,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      treeshake: true, // für Produktion empfohlen
    },
  },
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
  },
  server: {
    https: true,
    host: true,
    port: 5173,
    open: false
  },
};
