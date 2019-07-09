import React from 'react';
import { withFirebase } from '../Firebase';
import '../components.css';
// firebase.doSignOut

const SignOutButton = ({firebase}) => (
  <button className="signout" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);