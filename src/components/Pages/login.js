import React from 'react';
import '../components.css';
import {withRouter} from 'react-router-dom'
import 'firebase/auth';
import SignInForm from "./signInForm"

 const Login = () => (
   <div className="AppContainer">
      <SignInForm/>
   </div>
);

export default withRouter(Login);