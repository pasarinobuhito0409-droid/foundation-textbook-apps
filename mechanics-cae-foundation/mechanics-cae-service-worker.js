const CACHE_NAME = "mechanics-cae-foundation-v3";

const APP_SHELL = [
  "./",
  "./mechanics-cae-foundation-textbook.html",
  "./mechanics-cae-manifest.webmanifest",
  "./mechanics-cae-icon.svg",
  "./assets/t02-fix-real.png",
  "./assets/t02-bolt-fixed-real.png",
  "./assets/t02-ng-slip-real.png",
  "./assets/t02-cae-screen-real.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
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
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
