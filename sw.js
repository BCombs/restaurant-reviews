const cacheName = 'restaurant-v1';
const restaurantCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/restaurant.html?id=1',
    '/restaurant.html?id=2',
    '/restaurant.html?id=3',
    '/restaurant.html?id=4',
    '/restaurant.html?id=5',
    '/restaurant.html?id=6',
    '/restaurant.html?id=7',
    '/restaurant.html?id=8',
    '/restaurant.html?id=9',
    '/restaurant.html?id=10',
    '/data/restaurants.json',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/css/styles.css',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(restaurantCache);
        })
    )
});

self.addEventListener('activte', e => {
    // Remove old caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cache => {
                if(cache !== cacheName) return caches.delete(cache);
            }))
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            if(response) {
                return response;
            }
            return fetch(e.request);
        }).catch( err => {
            console.log(err);
        })
    );
});