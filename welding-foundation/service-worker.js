const CACHE_NAME = "welding-foundation-v4";
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
  "./assets/w01-arc-frames/frame-01.jpg",
  "./assets/w01-arc-frames/frame-02.jpg",
  "./assets/w01-arc-frames/frame-03.jpg",
  "./assets/w01-arc-frames/frame-04.jpg",
  "./assets/w01-arc-frames/frame-05.jpg",
  "./assets/w01-arc-frames/frame-06.jpg",
  "./assets/w01-arc-frames/frame-07.jpg",
  "./assets/w01-arc-frames/frame-08.jpg",
  "./assets/w01-arc-frames/frame-09.jpg",
  "./assets/w01-arc-frames/frame-10.jpg",
  "./assets/w01-arc-frames/frame-11.jpg",
  "./assets/w01-arc-frames/frame-12.jpg",
  "./assets/w01-arc-frames/frame-13.jpg",
  "./assets/w01-arc-frames/frame-14.jpg",
  "./assets/w01-arc-frames/frame-15.jpg",
  "./assets/w01-arc-frames/frame-16.jpg",
  "./assets/w01-arc-frames/frame-17.jpg",
  "./assets/w01-arc-frames/frame-18.jpg",
  "./assets/w01-arc-frames/frame-19.jpg",
  "./assets/w01-arc-frames/frame-20.jpg",
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
