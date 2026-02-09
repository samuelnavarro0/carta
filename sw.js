// sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js');

const firebaseConfig = {
    apiKey: "AIzaSyAXhQzt9zenYwsceZBZ2D3939EykqB-HAE",
    authDomain: "cartas-amor-941ab.firebaseapp.com",
    databaseURL: "https://cartas-amor-941ab-default-rtdb.firebaseio.com",
    projectId: "cartas-amor-941ab",
    storageBucket: "cartas-amor-941ab.firebasestorage.app",
    messagingSenderId: "987328078744",
    appId: "1:987328078744:web:0fa7cc713e4026cfe581ed"
};

// Inicializamos dentro del SW
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// Escuchar cambios en la base de datos
db.ref('cartas').limitToLast(1).on('child_added', (snapshot) => {
    const carta = snapshot.val();
    const ahora = Date.now();
    
    // Solo si la carta se creó hace menos de 2 minutos
    if (ahora - carta.timestamp < 120000) {
        self.registration.showNotification("¡Nueva carta de Amor! 💌", {
            body: "Duna, tienes un mensaje: " + carta.title,
            icon: 'https://cdn-icons-png.flaticon.com/512/2904/2904973.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/2904/2904973.png',
            vibrate: [200, 100, 200],
            tag: 'nueva-carta',
            renotify: true
        });
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow("./") 
    );
});
