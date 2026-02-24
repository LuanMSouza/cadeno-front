const CACHE_NAME = 'caderno-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/android-launchericon-192-192.png', // Nome exato do seu arquivo
    '/android-launchericon-512-512.png'  // Certifique-se que o de 512 também tem esse padrão
];

// Instalação
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Ativação
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch - Network first, fallback to cache
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                return caches.match(event.request)
                    .then(response => response || new Response('Offline - Página não encontrada', { status: 404 }));
            })
    );
});