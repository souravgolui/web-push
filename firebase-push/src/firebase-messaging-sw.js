importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDIiBtFTV7FKKr9l4Us8qAo1hWNNJJAL18",
  authDomain: "fcm-test-a62f6.firebaseapp.com",
  projectId: "fcm-test-a62f6",
  storageBucket: "fcm-test-a62f6.appspot.com",
  messagingSenderId: "1061382984153",
  appId: "1:1061382984153:web:d3dde1edc029e6c0dec9c8",
  measurementId: "G-EKCMWMLQBP"
});
const messaging = firebase.messaging();

