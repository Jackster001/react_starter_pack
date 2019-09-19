import React from 'react';
import '../components.css';
import logo from '../images/SBNYC-logo.jpg'
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
 
            <center><h1 className="dashboard">SBNYC Dashboard</h1>
            <div><img src={logo} height="250px" width="650px" alt="logo"/></div></center>
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
