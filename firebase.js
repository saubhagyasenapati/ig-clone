// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgxdi_LkOteTQ-zzWw9acscpc8Rj1iscM",
  authDomain: "instagram-clone-reactnat-cfbfc.firebaseapp.com",
  projectId: "instagram-clone-reactnat-cfbfc",
  storageBucket: "instagram-clone-reactnat-cfbfc.appspot.com",
  messagingSenderId: "249490912828",
  appId: "1:249490912828:web:059938aa0e67574b253539",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
// !firebaseConfig.apps.length?firebaseConfig.initializeApp(firebaseConfig):firebaseConfig.app()
const db = getFirestore(app);
export default db;
