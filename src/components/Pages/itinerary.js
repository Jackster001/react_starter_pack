import React from 'react';
import '../components.css';
import Navigation from '../navigation'
import Header from '../header';
import Footer from '../footer';
class Itinerary extends React.Component {
   render() {
      return (
         <div className="App"> <Header/>
         <div>
             <Navigation/>
            <center><h1>Itinerary</h1></center>
         </div>
         <Footer/>
      </div>
      );
   }
}
export default Itinerary