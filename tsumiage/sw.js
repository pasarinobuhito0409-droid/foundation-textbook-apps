// 積み上げ帳アプリの留守番係: 一度開けば、電波が無くても開ける。新しい版が有れば次に開いた時に入れ替わる
var V = "tsumiage-c1bf601dd1";
var FILES = ["./", "index.html", "three.min.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET") return;
  var u = new URL(r.url);
  if (u.pathname.endsWith(".mp4")) return;   // 動画は途中から読む事が有るので、留守番係は通さない
  if (r.mode === "navigate" || u.pathname.endsWith("/index.html")) {
    // 本体は、まず新しい物を取りに行き、だめなら手元の物
    e.respondWith(fetch(r).then(function (res) {
      var cp = res.clone(); caches.open(V).then(function (c) { c.put("index.html", cp); });
      return res;
    }).catch(function () { return caches.match("index.html"); }));
    return;
  }
  // 字の形（Google Fonts）と絵は、手元に有ればそれを使い、無ければ取って残す
  e.respondWith(caches.match(r).then(function (hit) {
    return hit || fetch(r).then(function (res) {
      if (res && (res.ok || res.type === "opaque")) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(r, cp); }); }
      return res;
    });
  }));
});
