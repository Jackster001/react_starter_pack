import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from './context';
import firebaseApp from "../Firebase/firebase"
import {setUserAuth, setOffUserAuth} from "../../Action/sessionAction"
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      // this.props.onSetAuthUser(
      //   JSON.parse(localStorage.getItem('authUser')),
      // );
    }

    
      // this.listener = this.props.firebase.auth.onAuthStateChanged(
      //   authUser => {
      //     authUser
      //       ? this.setState({ authUser })
      //       : this.setState({ authUser: null });
      //   },
      // );
      componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.props.setUserAuth();
          console.log("this is the auth user")
        },
        () => {
          localStorage.removeItem('authUser');
          this.props.setOffUserAuth();
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (<Component {...this.props} />
      // condition(this.props.authUser)?(
          
          // ) : null;
        // <AuthUserContext.Provider value={this.state.authUser}>
        
        // </AuthUserContext.Provider>
      )
    }
  }

  return compose(connect(null, {setUserAuth, setOffUserAuth}),)(WithAuthentication);
};

export default withAuthentication;