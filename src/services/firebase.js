// File: src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCMZ-ZfsrwHqMfbTOPg7TpVyFFYFElyfXw",
  authDomain: "ticket-booking-applicati-4c674.firebaseapp.com",
  databaseURL: "https://ticket-booking-applicati-4c674-default-rtdb.firebaseio.com",
  projectId: "ticket-booking-applicati-4c674",
  storageBucket: "ticket-booking-applicati-4c674.appspot.com",
  messagingSenderId: "201055489890",
  appId: "1:201055489890:web:40dec5fd48fab7bcd9a63b",
  measurementId: "G-N0MNV1MJRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
