import React from 'react';
import { withFirebase } from '../Firebase';
// firebase.doSignOut

const SignOutButton = ({firebase}) => (
  <button type="button" onClick={ ()=> console.log(firebase)}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);