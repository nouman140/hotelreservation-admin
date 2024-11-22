import firebase from "firebase/app";
// import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgZOGCkcmm_jiweuh3nxNN5TQ7Wop30IU",
  authDomain: "hotel-reservation-15c1e.firebaseapp.com",
  projectId: "hotel-reservation-15c1e",
  storageBucket: "hotel-reservation-15c1e.appspot.com",
  messagingSenderId: "892796861507",
  appId: "1:892796861507:web:1c7667a6e461547573a8f6",
  measurementId: "G-RJ8KF8Z2G6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
