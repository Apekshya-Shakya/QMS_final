import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuH-sRMqWK9cxt5S7bMvhbBVxMb9tFAEM",
  authDomain: "react-web-2b3b0.firebaseapp.com",
  projectId: "react-web-2b3b0",
  storageBucket: "react-web-2b3b0.appspot.com", // ✅ Fixed
  messagingSenderId: "372702408860",
  appId: "1:372702408860:web:ff047cb036522a9a1dfd59",
  measurementId: "G-QRZEKYG4SJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
