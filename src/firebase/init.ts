import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8d1ESL96e-1fGC_9kf78axmEy4rVDnks",
  authDomain: "number-guessing-game-644c8.firebaseapp.com",
  projectId: "number-guessing-game-644c8",
  storageBucket: "number-guessing-game-644c8.appspot.com",
  messagingSenderId: "95217417991",
  appId: "1:95217417991:web:13fe7814795da565d44fa2",
};

export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
