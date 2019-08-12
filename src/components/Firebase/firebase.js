// import app from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore';
// import firebase from "firebase";
// const config = {
//     apiKey: "AIzaSyCY3WXhUaCOelSWUlrKEoIgQcsK_KPTf8s",
//     authDomain: "test-bcd7a.firebaseapp.com",
//     databaseURL: "https://test-bcd7a.firebaseio.com",
//     projectId: "test-bcd7a",
//     storageBucket: "test-bcd7a.appspot.com",
//     messagingSenderId: "687879184134",
//     appId: "1:687879184134:web:d2dee75e183a822e"
//   };
// const firebaseApp = firebase.initializeApp(config);

// export const fb=firebaseApp;
// export const db= firebaseApp.firestore();
// export const auth =firebaseApp.auth(); 
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import firebase from "firebase";
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
export const auth =firebaseApp.auth(); 


