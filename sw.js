/* 收纳小管家 · Service Worker（缓存优先，支持离线打开） */
const CACHE = 'organizer-v2.36';
const ASSETS = [
  './',
  './index.html',
  './mobile.css',
  './mobile.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (cache) {
    return cache.addAll(ASSETS).catch(function () {});
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  let url;
  try { url = new URL(e.request.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  // 核心文件网络优先：每次先取线上最新版，失败才用缓存
  const path = url.pathname;
  const isCore = /\/(index\.html|mobile\.js|mobile\.css|sw\.js)$/.test(path)
    || path.endsWith('/');
  if (isCore) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(e.request, copy); }).catch(function () {});
        return res;
      }).catch(function () { return caches.match(e.request); })
    );
    return;
  }

  // 其余静态资源（图片等）仍缓存优先
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      return cached || fetch(e.request).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(e.request, copy); }).catch(function () {});
        return res;
      }).catch(function () { return cached; });
    })
  );
});
