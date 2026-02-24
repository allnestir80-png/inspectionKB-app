// ============================================================================
// SERVICE WORKER для офлайн-режима
// Версия: 2.0
// ============================================================================

const CACHE_NAME = 'telegram-inspection-v2.0';

const ASSETS = [
    './',
    './index.html',
    './app.js',
    './sw.js',
    './manifest.json'
];

// === INSTALL ===
self.addEventListener('install', (e) => {
    console.log('[SW] Install');
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Кэширование файлов');
                return cache.addAll(ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// === ACTIVATE ===
self.addEventListener('activate', (e) => {
    console.log('[SW] Activate');
    e.waitUntil(
        caches.keys()
            .then((keys) => {
                return Promise.all(
                    keys.filter((key) => key !== CACHE_NAME)
                        .map((key) => {
                            console.log('[SW] Удаление старого кэша:', key);
                            return caches.delete(key);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// === FETCH ===
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(e.request).catch(() => {
                    if (e.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});

// === BACKGROUND SYNC ===
self.addEventListener('sync', (e) => {
    if (e.tag === 'send-inspection') {
        console.log('[SW] Фоновая синхронизация');
        e.waitUntil(sendPendingInspections());
    }
});

async function sendPendingInspections() {
    console.log('[SW] Отправка отложенных проверок');
    // Future: Implement sync with server
}
