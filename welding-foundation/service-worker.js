const CACHE_NAME = "welding-foundation-v5";
const W01_BASE_FRAMES = Array.from(
  { length: 20 },
  (_, index) => `./assets/w01-arc-frames/frame-${String(index + 1).padStart(2, "0")}.jpg`
);
const W01_SMOOTH_FRAMES = Array.from(
  { length: 60 },
  (_, index) => `./assets/w01-arc-smooth-frames/frame-${String(index + 1).padStart(3, "0")}.jpg`
);
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./service-worker.js",
  "./welding-icon.svg",
  "./assets/w00-weld-bead.png",
  "./assets/w01-arc-real.png",
  "./assets/w01-card-electrode-gap.jpg",
  "./assets/w01-card-arc-bridge.jpg",
  "./assets/w01-card-molten-pool.jpg",
  "./assets/w01-card-heat-affected-zone.jpg",
  "./assets/w01-card-definition-arc.jpg",
  "./assets/w01-card-mechanism-gap.jpg",
  "./assets/w01-card-energy-to-heat.jpg",
  "./assets/w01-card-burn-through.jpg",
  "./assets/w01-card-thick-part-heat-sink.jpg",
  "./assets/w01-card-heat-pen-control.jpg",
  ...W01_BASE_FRAMES,
  ...W01_SMOOTH_FRAMES,
  "./assets/welding-app-preview.png"
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
