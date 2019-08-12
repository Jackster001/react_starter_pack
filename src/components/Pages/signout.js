import React from 'react';
import '../components.css';
import {signOut} from '../../Action'
import {connect} from "react-redux"
// firebase.doSignOut

const SignOutButton = (props) => (
  <button className="signout" type="button" onClick={()=>props.signOut()}>
    Sign Out
  </button>
);

export default connect(null, {signOut})(SignOutButton);