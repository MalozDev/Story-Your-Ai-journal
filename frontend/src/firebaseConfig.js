// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1XHZStx2FgXxN1CQdhWmDGmC39aeW7Ew",
  authDomain: "story-ai-journal.firebaseapp.com",
  projectId: "story-ai-journal",
  storageBucket: "story-ai-journal.firebasestorage.app",
  messagingSenderId: "93740357480",
  appId: "1:93740357480:web:0698d72b8e08d18dc568dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };