importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

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
    messaging.setBackgroundMessageHandler(function(payload) {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      const notificationTitle = 'Background Message Title';
      const notificationOptions = {
        body: 'Background Message body.',
        icon: 'pwa-64x64.png'
      };
      return self.registration.showNotification(notificationTitle, notificationOptions);
    });
    console.log('firebase initialized');
  }
});




self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('Push received: ', data);
  const options = {
    body: data.notification.body,
    icon: data.notification.image || 'pwa-64x64.png',
  };
  event.waitUntil(
    self.registration.showNotification(data.notification.title, options)
  );
});
