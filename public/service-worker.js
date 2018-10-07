/**
 * turn debug mode on
 */
workbox.setConfig({
  debug: true,
});

workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

/**
 * set caching prefix
 */
workbox.core.setCacheNameDetails({
  prefix: 'constraints',
});

/**
 * precache files injected by webpack workbox plugin plus additional files
 * for better offline experience
 */
/* eslint-disable-next-line no-underscore-dangle, no-restricted-globals */
workbox.precaching.precacheAndRoute([...self.__precacheManifest,
  'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_CHTML']);

/**
 * cache js and css with stale while revalidate strategy
 */
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate(),
);

/**
 * cache images with cache first strategy
 */
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 5 * 60, // 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

/**
 * cache resources from cloudflare cdn
 */
workbox.routing.registerRoute(
  /https:\/\/cdnjs.cloudflare.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cloudflareCache',
    cacheableResponse: {
      statuses: [0, 200],
    },
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 5 * 60, // 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

