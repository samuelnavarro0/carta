// sw.js - Este código corre en segundo plano
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || "¡Nueva carta de Amor! 💌";
    const options = {
        body: data.body || "Duna, tienes un mensaje nuevo esperándote.",
        icon: 'https://cdn-icons-png.flaticon.com/512/2904/2904973.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/2904/2904973.png',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Al hacer clic en la notificación, abre la web
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow("https://TU-USUARIO.github.io/TU-REPO/") // <--- PON TU URL AQUÍ
    );
});
