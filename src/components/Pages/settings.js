import React from 'react';
import '../components.css';
import Navigation from '../navigation'
class Settings extends React.Component {
   render() {
      return (
         <div className="App">
         <div>
             <Navigation/>
            <center><h1>Settings</h1></center>
         </div>
         </div>
      );
   }
}
export default Settings