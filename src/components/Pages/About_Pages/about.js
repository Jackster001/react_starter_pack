import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
class About extends React.Component {
   render() {
      return (
      <div className="App">
         <div><br/>
            <center><h1>About Info Management</h1></center><br/>
            <div>
                <form>
                    
                </form>
            </div>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(About)