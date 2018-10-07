module.exports = {
  pwa: {
    name: 'aircraft-constraints',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/service-worker.js',
    },
  },
};
