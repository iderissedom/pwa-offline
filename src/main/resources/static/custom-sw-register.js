// Custom Service Worker Registration with iOS debugging
(function() {
  'use strict';

  // Log to help debug on iOS
  function log(message, data) {
    console.log('[SW Register]', message, data || '');
  }

  function error(message, err) {
    console.error('[SW Register]', message, err);
    // Show visible error for iOS debugging
    if (err) {
      alert('SW Error: ' + message + '\n' + err.message);
    }
  }

  if (!('serviceWorker' in navigator)) {
    error('Service Workers not supported in this browser');
    return;
  }

  log('Service Worker support detected');

  window.addEventListener('load', function() {
    log('Window loaded, attempting to register SW');

    navigator.serviceWorker
      .register('/sw.js', {
        scope: '/',
        updateViaCache: 'none' // Important for iOS
      })
      .then(function(registration) {
        log('SW registered successfully', {
          scope: registration.scope,
          active: !!registration.active,
          waiting: !!registration.waiting,
          installing: !!registration.installing
        });

        // Log state changes
        registration.addEventListener('updatefound', function() {
          log('SW update found');
          const newWorker = registration.installing;

          if (newWorker) {
            newWorker.addEventListener('statechange', function() {
              log('SW state changed to: ' + newWorker.state);
            });
          }
        });

        // Check for updates periodically (iOS might need this)
        setInterval(function() {
          registration.update();
        }, 60000); // Check every minute

      })
      .catch(function(err) {
        error('SW registration failed', err);
      });

    // Log controller changes
    navigator.serviceWorker.addEventListener('controllerchange', function() {
      log('SW controller changed - page is now controlled by SW');
    });

    // Log messages from SW
    navigator.serviceWorker.addEventListener('message', function(event) {
      log('Message from SW', event.data);
    });

    // Check if already controlled
    if (navigator.serviceWorker.controller) {
      log('Page is already controlled by SW');
    } else {
      log('Page is NOT controlled by SW yet');
    }
  });
})();
