// This is the service worker for the PWA

// Cache name
const CACHE_NAME = 'pwa-checkin-v1';

// Assets to cache
const urlsToCache = [
  '/',
  '/manifest.json',
  '/next.svg',
  '/vercel.svg',
  '/file.svg',
  '/window.svg',
  '/globe.svg'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If fetch fails, try to return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});

// Handle background sync for check-ins
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-checkins') {
    event.waitUntil(syncCheckIns());
  }
});

// Function to sync check-ins
async function syncCheckIns() {
  try {
    // Get unsynced check-ins from IndexedDB or localStorage
    const unsyncedCheckIns = JSON.parse(localStorage.getItem('unsyncedCheckIns') || '[]');
    
    if (unsyncedCheckIns.length === 0) {
      return;
    }
    
    // Try to sync each check-in
    for (const checkIn of unsyncedCheckIns) {
      try {
        // Simulate API call
        const response = await fetch('/api/checkin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(checkIn),
        });
        
        if (response.ok) {
          // Remove from unsynced list
          const index = unsyncedCheckIns.findIndex(c => c.id === checkIn.id);
          if (index !== -1) {
            unsyncedCheckIns.splice(index, 1);
          }
        }
      } catch (error) {
        console.error('Failed to sync check-in:', error);
      }
    }
    
    // Update localStorage with remaining unsynced check-ins
    localStorage.setItem('unsyncedCheckIns', JSON.stringify(unsyncedCheckIns));
    
  } catch (error) {
    console.error('Error in syncCheckIns:', error);
  }
}
