import path from 'path';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www');

export default {
  plugins: [
    react(),
    mkcert() // Nutzt automatisch ein vertrauenswürdiges Zertifikat für localhost
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
    https: true,   // mkcert erzeugt HTTPS automatisch
    host: true,    // Erlaubt Zugriff von Geräten im WLAN (z. B. iPhone)
    port: 5173,
    open: true
  },
};
