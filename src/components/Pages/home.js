import React from 'react';
import '../components.css';
import logo from '../images/SBNYC-logo.jpg'
import { withAuthorization } from '../Session';

class Home extends React.Component {

   render() {
      return (
      <div className="App">
         <div className="Home">
 
            <center><h1 className="dashboard">SBNYC Dashboard</h1>
            <div><img src={logo} height="250px" width="650px"/></div></center>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home)
