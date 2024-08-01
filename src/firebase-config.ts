import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
