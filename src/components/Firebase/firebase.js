import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/storage'; 
const config = {
  apiKey: "AIzaSyA_qezPiFgYiJm99TS3GXS0XMfjM-qpf1w",
  authDomain: "tour-management-app.firebaseapp.com",
  databaseURL: "https://tour-management-app.firebaseio.com",
  projectId: "tour-management-app",
  storageBucket: "tour-management-app.appspot.com",
  messagingSenderId: "377919959654",
  appId: "1:377919959654:web:fd60a66386352b221d73a7",
  measurementId: "G-N3P7WJRXFW"
  };
const firebaseApp = firebase.initializeApp(config);

export const fb=firebaseApp;
export const db= firebaseApp.firestore();
export const storageRef = firebaseApp.storage();
export const auth =firebaseApp.auth(); 


