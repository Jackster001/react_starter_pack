import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {editItinerary, itineraryChanged} from '../../../Action/itineraryAction';
class ItineraryEdit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.itineraryHead.id,
            groupName: this.props.itineraryHead.groupName,
            schedule:[...this.props.selectedItinerary.activities],
            date: this.props.selectedItinerary.date,
            newScheduleSet:[]
        }
    }
    componentDidMount(){
        let date= new Date(this.state.date.seconds*1000)
        let timestamp= date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        this.setState({date:timestamp})
    }
    onChangeDescription(event, key){
        let newDescription = this.state.schedule
        newDescription[key].description= event.target.value;
        this.setState({...this.state, newScheduleSet: newDescription});
    }
    addSchedule(){
        let time = "12:00:00";
        let description = "";
        let scheduleSet= this.state.schedule
        scheduleSet.push({time, description});
        this.setState({schedule: scheduleSet})
    }
    removeSchedule(key){
        let newScheduleSet = this.state.schedule;
        newScheduleSet.splice(key, 1);
        this.setState({...this.state,schedule: newScheduleSet})
    }
    submit(){
        console.log(this.state.schedule)
    }
    render(){
        return(
            <div>
                <br/><br/><br/><br/>
                <div className="itinerary_Table_Styles">
                    <div className="editFormHeading"><h1>Schedule Management</h1></div>
                    <form className="itinerary_form">
                        <label htmlFor="group_name"><b>Group Name: </b></label>
                        <input value={this.state.groupName} readonly disabled/>
                        <label htmlFor="ItineraryDate"><b>Date: </b></label>
                        <input value={this.state.date} readonly disabled></input>
                        <br/><br/><br/><hr/><br/><br/>
                        <table>
                            <thead>
                                <th>Time</th>
                                <th>Description</th>
                                <th>Remove</th>
                            </thead>
                            <tbody>
                                {this.state.schedule.map((scheduleItem, key)=>{
                                    let timeObject = Object.assign({},scheduleItem.time);
                                    let time = new Date(timeObject.seconds*1000)
                                    let timestampTime= time.toLocaleTimeString('en-US', {hour: '2-digit', minute: "2-digit", second: "2-digit"})
                                    let hour= ""+time.getHours();
                                    let minute = ""+time.getMinutes();
                                    if(hour.length == 1){
                                        hour="0"+hour;
                                    }
                                    if(minute.length == 1){
                                        minute="0"+minute;
                                    }
                                    let strTime=""+hour+":"+minute+":00"

                                    if(typeof scheduleItem.time == "string")
                                    
                                    return (
                                        <tr className="scheduleItem">
                                            <td><input type="time" className="currentTime" value={strTime}/></td>
                                            <td><textarea defaultValue={this.state.schedule[key].description} ></textarea></td>
                                            <td><div onClick={()=>this.removeSchedule(key)}>Remove</div></td>
                                        </tr>
                                        
                                    )
                                })}
                            </tbody>
                        </table>
                    </form>
                    <button className="scheduleAddButton" onClick={()=>this.addSchedule()}>Add Schedule</button>
                    <br/><br/>
                    <button className="scheduleSubmitButton" onClick={()=>this.submit()}>Submit</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    selectedItinerary : state.itineraryState.selectedItinerary,
    itineraryHead: state.itineraryState.itineraryHead
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {editItinerary, itineraryChanged}
    ),withAuthorization(condition)
)(ItineraryEdit);