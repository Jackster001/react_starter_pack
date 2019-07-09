import React from 'react';
import '../components.css';
import Navigation from '../navigation'
class Alarm extends React.Component {
   render() {
      return (
         <div className="App">
         <div>
             <Navigation/>
            <center><h1>Alarm</h1></center>
         </div>
      </div>
      );
   }
}
export default Alarm