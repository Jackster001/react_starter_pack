import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {setUserAuth, setOffUserAuth} from "../../Action/sessionAction"
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
    }
      componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.props.setUserAuth();
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
      )
    }
  }

  return compose(connect(null, {setUserAuth, setOffUserAuth}),)(WithAuthentication);
};

export default withAuthentication;