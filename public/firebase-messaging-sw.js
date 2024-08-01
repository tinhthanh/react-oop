importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAOi_TN4at6W__9Jjzz31EEzMxQS5nf1s0",
    authDomain: "vetgo-01.firebaseapp.com",
    databaseURL: "https://vetgo-01-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vetgo-01",
    storageBucket: "vetgo-01.appspot.com",
    messagingSenderId: "883303533949",
    appId: "1:883303533949:web:fcd2839a459ed1ae6e1014",
    measurementId: "G-TFR9L0R342"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
