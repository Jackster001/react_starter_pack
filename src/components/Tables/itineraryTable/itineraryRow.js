import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getItineraries, addItinerary, itineraryAdded, deleteItinerary, selectItinerary, selectItineraryChanging, editItinerary, itineraryChanged} from '../../../Action/itineraryAction'
import withAuthorization from '../../Session/withAuthorization';
import ActivityTable from "./activityTable";
class ItineraryRow extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            selected : {}, 
            show:false,
            listShow:false,
            showList: "",
            tourGuides:[],
            leadChaperones:[],
            radioSelected: "",
            targetList:[],
            avaliableTourGuides:[],
            avaliableLeadChaperones:[],
            assignedTourGuide:{},
            assignedLeadChaperone:{}
        }
    }
    componentDidUpdate(){
        if(this.props.selectItineraryChanged){
            this.props.selectItineraryChanging()
            this.props.history.push('/itinerary/'+this.props.id);  
        } 
    }
    selected(id, index){
        this.props.selectItinerary(id, index);
    }
    handleDelete(id){
        alert("User with id:"+this.props.id+" has been deleted from the database");
        // this.props.deleteGroup(id);
    }
    render(){
        return(
            <tr>
                <td><center><h2><b>{this.props.groupName}</b></h2></center></td>
                <td>{this.props.date}</td>
                <td className="scheduleBox">{<ActivityTable activities={this.props.activities} id={this.props.id} index={this.props.index} length={this.props.length}/>}
                </td>
                <td>
                <center><button className="edit_button" onClick={()=>this.selected(this.props.id, this.props.index)}>Edit</button><br/></center>
                <center><button className="delete_button" id={this.props.id} onClick={() => { if (window.confirm('Are you sure you wish to delete this Group?')) this.handleDelete(this.props.id)}}>Delete</button></center>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({
    selectedItinerary : state.itineraryState.selectedItinerary,
    selectItineraryChanged: state.itineraryState.selectItineraryChanged,
    itineraryHead: state.itineraryState.itineraryHead
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {getItineraries, addItinerary, itineraryAdded, deleteItinerary, selectItinerary, selectItineraryChanging, editItinerary, itineraryChanged}
    ),withAuthorization(condition)
)(ItineraryRow);