import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/storage'; 
const config = {
    apiKey: "AIzaSyAj4kECq6S36sL_YV5q3dZEr51RSXYcQEs",
    authDomain: "sbnyc-76467.firebaseapp.com",
    databaseURL: "https://sbnyc-76467.firebaseio.com",
    projectId: "sbnyc-76467",
    storageBucket: "sbnyc-76467.appspot.com",
    messagingSenderId: "784736091593",
    appId: "1:784736091593:web:97b3ebc931102b13"
  };
const firebaseApp = firebase.initializeApp(config);

export const fb=firebaseApp;
export const db= firebaseApp.firestore();
export const storageRef = firebaseApp.storage();
export const auth =firebaseApp.auth(); 


