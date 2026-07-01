const CACHE_NAME = "solidworks-foundation-mid-m01-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./solidworks-icon.png",
  "./assets/solidworks-hero-real.png",
  "./assets/sw-mid-completion-preview-real.png",
  "./assets/sw01-sketch-real.png",
  "./assets/sw01-extrude-real.png",
  "./assets/sw01-underdefined-real.png",
  "./assets/sw01-feature-tree-real.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
