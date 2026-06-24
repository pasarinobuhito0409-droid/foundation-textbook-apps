const CACHE_NAME = "mechanical-design-foundation-v4";

const APP_SHELL = [
  "./",
  "./mechanical-design-foundation-textbook.html",
  "./mechanical-design-manifest.webmanifest",
  "./mechanical-design-icon.svg",
  "./assets/md02-bracket-drawing-real.png",
  "./assets/md02-frames/frame-01.jpg",
  "./assets/md02-frames/frame-02.jpg",
  "./assets/md02-frames/frame-03.jpg",
  "./assets/md02-frames/frame-04.jpg",
  "./assets/md02-frames/frame-05.jpg",
  "./assets/md02-frames/frame-06.jpg",
  "./assets/md02-frames/frame-07.jpg",
  "./assets/md02-frames/frame-08.jpg",
  "./assets/md02-frames/frame-09.jpg",
  "./assets/md02-frames/frame-10.jpg",
  "./assets/md02-frames/frame-11.jpg",
  "./assets/md02-frames/frame-12.jpg",
  "./assets/md02-frames/frame-13.jpg",
  "./assets/md02-frames/frame-14.jpg",
  "./assets/md02-frames/frame-15.jpg",
  "./assets/md02-frames/frame-16.jpg",
  "./assets/md02-frames/frame-17.jpg",
  "./assets/md02-frames/frame-18.jpg",
  "./assets/md02-frames/frame-19.jpg",
  "./assets/md02-frames/frame-20.jpg"
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
