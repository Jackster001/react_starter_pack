import React from 'react';
import '../components.css';
import Navigation from '../navigation'
class Content extends React.Component {
   render() {
      return (
      <div className="App">
         <div>
             <Navigation/>
            <center><h1>Content Management</h1></center>
         </div>
      </div>
      );
   }
}
export default Content