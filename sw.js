const CACHE = 'albaze-v3';
const CORE = ['./','./index.html','./services.html','./about.html','./articles.html','./contact.html','./tools.html','./service.html','./style.css','./main.js','./extras.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const cp = res.clone();
      if (res.ok && e.request.url.startsWith(self.location.origin)) caches.open(CACHE).then(c => c.put(e.request, cp));
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});