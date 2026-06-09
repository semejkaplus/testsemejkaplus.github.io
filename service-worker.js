const CACHE_NAME = 'semejka-v10';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/scripts/main.js',
    '/images/logo.png',  // добавлен логотип в список кешируемых ресурсов
    '/images/icon-192.png',
    '/images/icon-512.png'
];

// Установка сервис-воркера
self.addEventListener('install', async event => {
    try {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => cache.addAll(STATIC_ASSETS))
        );
    } catch (error) {
        console.error('Ошибка при установке Service Worker:', error);
    }
});

// Активация и очистка старых кешей
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== CACHE_NAME)
                        .map(key => caches.delete(key))
                );
            })
            .catch(error => console.error('Ошибка при активации:', error))
    );
});

// Обработка сетевых запросов
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Пропускаем сторонние API
    if (url.origin.includes('supabase.
