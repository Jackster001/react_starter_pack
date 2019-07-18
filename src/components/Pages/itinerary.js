import React from 'react';
import '../components.css';
import { withAuthorization } from '../Session';
import ItineraryTable from '../Tables/itineraryTable'
class Itinerary extends React.Component {
   render() {
      return (
         <div className="App">
         <div>
            <center><h1>Itinerary</h1></center>
            <center><ItineraryTable/></center>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Itinerary)