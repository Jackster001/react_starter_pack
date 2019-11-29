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
    handleDelete(date){
        let selectedItinerary = this.props.itineraries.find(itinerary =>{
            return itinerary.id == this.props.id 
        })
        let month = date.getMonth()+1;
        let day= date.getDate();
        let year =date.getFullYear();
        let index;
        for(let i=0; i< selectedItinerary.dailyData.length;i++){
            let currentDate = new Date(selectedItinerary.dailyData[i].date.seconds*1000)
            let currentMonth = currentDate.getMonth()+1;
            let currentDay = currentDate.getDate();
            let currentYear = currentDate.getFullYear();
            if(month===currentMonth && day===currentDay && year===currentYear){
                index = i
                i=selectedItinerary.dailyData.length
            }
        }
        selectedItinerary.dailyData.splice(index,1)
        let newDailyData= selectedItinerary.dailyData
        this.props.deleteItinerary(newDailyData, this.props.id)
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
                <center><button className="delete_button" id={this.props.id} onClick={() => { if (window.confirm('Are you sure you wish to delete this Group?')) this.handleDelete(this.props.scheduleDate)}}>Delete</button></center>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({
    itineraries: state.itineraryState.itineraries,
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