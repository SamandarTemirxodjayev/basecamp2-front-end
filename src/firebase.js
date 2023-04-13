// ../firebase.js

// Import Firebase modules
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACcuZI1GZ2drW4K2qPbCzNJKuY-ycqPPA",
  authDomain: "basecamp2-9e880.firebaseapp.com",
  projectId: "basecamp2-9e880",
  storageBucket: "basecamp2-9e880.appspot.com",
  messagingSenderId: "1040995477347",
  appId: "1:1040995477347:web:c7711b7609306b1221d556"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp; // Add this export statement

