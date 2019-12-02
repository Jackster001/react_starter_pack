import React from 'react';
import '../components.css';
import logo from '../images/TMA_logo.png'
import { withAuthorization } from '../Session';
import { connect } from 'react-redux';
import { compose } from 'recompose';
class Home extends React.Component {
   constructor(props){
      super(props)
      this.state={
         auth: this.props.authUser
      }
   }
   render() {
      return (
      <div className="App">
         <div className="Home">
            <center><h1 className="dashboard">Welcome to TMA</h1>
            <div><img src={logo} height="350px" width="350px" alt="logo"/></div></center>
         </div>
      </div>
      );
   }
}
const mapStateToProps = state => ({
   authUser: state.sessionState.authUser
});
const condition = authUser => !!authUser;
export default compose(
   connect(
      mapStateToProps
   ),withAuthorization(condition)
)(Home);
