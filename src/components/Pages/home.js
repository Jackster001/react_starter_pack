import React from 'react';
import '../components.css';
import Navigation from '../navigation'
import logo from '../images/SBNYC-logo.jpg'
class Home extends React.Component {
   render() {
      return (
      <div className="App">
         <div className="Home">
            <Navigation/> 
            <center><h1 className="dashboard">SBNYC Dashboard</h1>
            <div><img src={logo} height="250px" width="650px"/></div></center>
         </div>
      </div>
      );
   }
}
export default Home