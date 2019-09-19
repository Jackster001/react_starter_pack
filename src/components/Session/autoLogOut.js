import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {signOut} from "../../Action/sessionAction";
function SessionExpire(){
    class AutoLogout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        signoutTime: 1000 * 60 * 15
      };
    }

    componentDidMount() {
      this.events = [
        'load',
        'mousemove',
        'mousedown',
        'click',
        'scroll',
        'keypress'
      ];

      for (var i in this.events) {
        window.addEventListener(this.events[i], this.resetTimeout);
      }

      this.setTimeout();
    }

    clearTimeoutFunc = () => {
      if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
    };

    setTimeout = () => {
      this.logoutTimeout = setTimeout(this.logout, this.state.signoutTime);
    };

    resetTimeout = () => {
      this.clearTimeoutFunc();
      this.setTimeout();
    };

    logout = () => {
      this.props.signOut()
    };

    render() {

      return (
        <div>
          <SessionExpire {...this.props} />
        </div>
      );
    }
}}
const mapStateToProps = state => ({
  
});
export default SessionExpire
// const mapStateToProps = state => ({
  
// });
// export default compose( 
//   connect( mapStateToProps,{signOut})
// )(AutoLogout);

