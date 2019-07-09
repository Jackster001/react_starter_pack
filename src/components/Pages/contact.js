import React from 'react';
import '../components.css';
import Navigation from '../navigation'
import Header from '../header';
import Footer from '../footer';
class Contact extends React.Component {
   render() {
      return (
         <div className="App">
         <div>
             <Navigation/>
            <center><h1>Contact</h1></center>
         </div>
      </div>
      );
   }
}
export default Contact