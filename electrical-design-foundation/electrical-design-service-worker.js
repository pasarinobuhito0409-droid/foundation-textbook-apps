const CACHE_NAME = "electrical-design-foundation-v12";

const APP_SHELL = [
  "./",
  "./electrical-design-foundation-textbook.html",
  "./electrical-design-manifest.webmanifest",
  "./electrical-design-icon.svg",
  "./electrical-design-e01-control-panel.png",
  "./electrical-e03-preview-real.png",
  "./electrical-e03-wire-safe-real.png",
  "./electrical-e03-wire-caution-real.png",
  "./electrical-e03-wire-danger-real.png",
  "./electrical-e03-micro-real.png",
  "./electrical-e03-ok-ng-real.png",
  "./electrical-e03-quiz-real.png",
  "./electrical-e04-preview-real.png",
  "./electrical-e04-workbench-real.png",
  "./electrical-e04-panel-real.png",
  "./electrical-e04-power-real.png",
  "./electrical-e04-load-real.png",
  "./electrical-e04-inrush-real.png",
  "./electrical-e04-margin-real.png",
  "./electrical-e04-quiz-real.png",
  "./electrical-e04-safe-real.png",
  "./electrical-e04-caution-real.png",
  "./electrical-e04-danger-real.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
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
