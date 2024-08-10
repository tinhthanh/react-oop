// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrqilvW6AunRzruXadJ5vIL5be4VVw12U",
  authDomain: "zone13-d5304.firebaseapp.com",
  databaseURL: "https://zone13-d5304-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zone13-d5304",
  storageBucket: "zone13-d5304.appspot.com",
  messagingSenderId: "776272303896",
  appId: "1:776272303896:web:ed068de0628247a0d2306d",
  measurementId: "G-81J3L2WHHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'virtual');
const database = getDatabase(app);

export { database };


