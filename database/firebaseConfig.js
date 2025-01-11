// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXH8VOePLi2DYSFJeyZXJxqJVqKUknoTU",
  authDomain: "react-native-firebase-932d2.firebaseapp.com",
  projectId: "react-native-firebase-932d2",
  storageBucket: "react-native-firebase-932d2.firebasestorage.app",
  messagingSenderId: "270318031991",
  appId: "1:270318031991:web:0f9ae05d4471a28aae6272"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);