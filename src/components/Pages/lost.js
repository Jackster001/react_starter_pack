import React from 'react';
import '../components.css';
import Navigation from '../navigation'
import Header from '../header';
import Footer from '../footer';
class Lost extends React.Component {
   render() {
      return (
      <div className="App">
         <div>
             <Navigation/>
            <center><h1>I am Lost</h1></center>
         </div>
      </div>
      );
   }
}
export default Lost