// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMsG2_zhvsvMp6PW-HR9ukp1g8eKWcchc",
  authDomain: "urbanfurnapp.firebaseapp.com",
  projectId: "urbanfurnapp",
  storageBucket: "urbanfurnapp.firebasestorage.app",
  messagingSenderId: "325082239079",
  appId: "1:325082239079:web:620ae5fafdddc2ac3604c2",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export initialized Firebase services for reuse
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
