import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
import ItineraryTable from '../../Tables/itineraryTable/itineraryTable';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getGroups} from '../../../Action/groupAction';
import {getItineraries} from '../../../Action/itineraryAction';
class Itinerary extends React.Component {
   constructor(props){
      super(props)
      this.state={
         date: new Date()
      }
   }
   componentDidMount(){
      this.props.getGroups();
      this.props.getItineraries();
   }
   onSubmit(){
      
   }
   render() {
      return (
      <div className="App">
         <br/>
         <div>
            <center>
               <h1>Itinerary Management</h1>
            </center>
            <center><ItineraryTable/></center>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
const mapStateToProps = state => ({
});
export default compose(
   connect(
      mapStateToProps,
     {getGroups, getItineraries}
   ),withAuthorization(condition)
)(Itinerary);