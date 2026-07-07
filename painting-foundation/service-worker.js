const CACHE_NAME = "painting-foundation-v3-3d";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./service-worker.js",
  "./painting-icon.svg",
  "./vendor/three.module.min.js",
  "./assets/spray-finishing-workbench-real.jpg",
  "./assets/coating-cross-section-real.png",
  "./assets/coating-micro-cross-section-real.png",
  "./assets/peeling-rust-real.jpg",
  "./assets/paint-adhesion-ok-ng-real.png",
  "./assets/paint-surface-roughness-real.png",
  "./assets/paint-drying-molecule-real.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
