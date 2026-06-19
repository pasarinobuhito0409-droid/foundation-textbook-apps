const CACHE_NAME = "solidworks-foundation-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./service-worker.js",
  "./solidworks-icon.png",
  "./assets/solidworks-hero-real.png",
  "./assets/sw01-sketch-real.png",
  "./assets/sw01-extrude-real.png",
  "./assets/sw01-feature-tree-real.png",
  "./assets/sw01-underdefined-real.png"
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
