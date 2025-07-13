module.exports = {
  globDirectory: 'www/',
  globPatterns: [
    '**/*.{woff,woff2,js,css,png,jpg,svg,html,json}'
  ],
  globIgnores: [],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: 'public/service-worker.js',
  // Cache für Offline bzw. schnellen Zugriff
  runtimeCaching: [
    {
      // OpenStreetMap Tiles
      urlPattern: /^https:\/\/{s}\.tile\.openstreetmap\.org\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'osm-tiles',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 Tage
        },
      },
    },
    {
      // Wikipedia & Nominatim API
      urlPattern: /^https:\/\/(en\.wikipedia\.org|nominatim\.openstreetmap\.org)\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24, // 1 Tag
        },
      },
    }
  ],
  // Automatisch aktivieren und übernehmen, dadurch wird Fresh erstellt
  skipWaiting: true,
  clientsClaim: true,
};
