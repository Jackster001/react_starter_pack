import React from 'react';
import '../components.css';
import {Link} from 'react-router-dom'
import logo from '../images/SBNYC-logo.jpg'
import withFirebaseAuth from 'react-with-firebase-auth'
// import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './../../firebaseConfig';
const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
   apiKey:"AIzaSyCY3WXhUaCOelSWUlrKEoIgQcsK_KPTf8s",
   authDomain: "test-bcd7a.firebaseapp.com",
   databaseURL: "https://test-bcd7a.firebaseio.com",
   projectId: "test-bcd7a",
 });
var db = firebase.firestore();
var admin = db.collection("Admin Login").doc("JPPyO1iUyCA6sWAIulCd");
admin.get().then(function(admin) {
   if (admin.exists) {
       console.log("Document data:", admin.data());
   } else {
       // doc.data() will be undefined in this case
       console.log("No such document!");
   }
}).catch(function(error) {
   console.log("Error getting document:", error);
});
class Login extends React.Component {
   render() {
      return (
         <div className="loginPage">
            <div className="loginPos">
            <div><img src={logo} height="250px" width="650px"/></div>
            <div className="login">
               <center>
               <h2>Admin Login</h2>
               <form className="loginForm">
                  {/* Username: <br/> */}
                  <input type="text" name="username" placeholder="Username"/>
                  <br/><br/>
                  {/* Password: <br/> */}
                  <input type="text" name="password" placeholder="Password"/>
                  <br/><br/>
                  <Link to="/home" ><button className="signIn">Sign In</button></Link>
               </form></center>
            </div>
         </div>
         </div>
      );
   }
}
export default Login