importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SET_FIREBASE_CONFIG') {
      const firebaseConfig = event.data.config;
      console.log('Received Firebase Config:', firebaseConfig);
         if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
                } else {
                firebase.app(); // nếu đã khởi tạo rồi thì sử dụng app đã có
            }
            const messaging = firebase.messaging();
            messaging.onBackgroundMessage(function(payload) {
            console.log('[firebase-messaging-sw.js] Received background message ', payload);
            const notificationTitle = payload.notification.title;
                const notificationOptions = {
                    body: payload.notification.body,
                };
            self.registration.showNotification(notificationTitle, notificationOptions);
            });
        }
    }); 
