import React from 'react';
import '../components.css';
import { withAuthorization } from '../Session';
class Content extends React.Component {
   render() {
      return (
      <div className="App">
         <div>
            <center><h1>Content Management</h1></center>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Content)