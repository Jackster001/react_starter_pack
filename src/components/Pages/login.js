import React from 'react';
import '../components.css';
import {withRouter} from 'react-router-dom'
import logo from '../images/SBNYC-logo.jpg'
import * as ROUTES from '../../constants/routes'
// import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import 'firebase/auth';
import Firebase from "../Firebase/firebase"
import firebase from "firebase";
import {login} from "../../Action"
import SignInForm from "./signInForm"

 const Login = () => (
   <div>
      <SignInForm/>
   </div>
);

export default withRouter(Login);