import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA1Howixt6blPIhKiN7DlyGVz5SpmZzcH4",
  authDomain: "veganrecipe-292fa.firebaseapp.com",
  projectId: "veganrecipe-292fa",
  storageBucket: "veganrecipe-292fa.appspot.com",
  messagingSenderId: "88533785899",
  appId: "1:88533785899:web:b5e19b694ca3cbbc8a396e",
  measurementId: "G-G9CERWHNCT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
