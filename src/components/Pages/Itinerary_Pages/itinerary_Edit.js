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
        // let timestamp= date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        this.setState({date:date})
        let tempSchedule= this.state.schedule;
        console.log(tempSchedule)
        for(let i=0; i< tempSchedule.length; i++){
            let time = new Date (tempSchedule[i].time.seconds*1000)
            tempSchedule[i].time=time
        }
        this.setState({schedule: tempSchedule})

    }
    onChangeDescription(event, key){
        let newDescription = this.state.schedule

        newDescription[key].description= event.target.value;

        this.setState({...this.state, schedule: newDescription});
    }
    onChangeTime(time, key){
        let newDescription = this.state.schedule
        let timestamp= new Date(this.state.date)
        let arrTime= time.split(":") 
        timestamp.setHours(arrTime[0])
        timestamp.setMinutes(arrTime[1])
        newDescription[key].time= timestamp;
        this.setState({...this.state, schedule: newDescription});
    }
    addSchedule(){
        let description = "";
        let scheduleSet= this.state.schedule;
        scheduleSet.push({time:"",description});
        this.setState({schedule: scheduleSet});
    }
    removeSchedule(key){
        let newScheduleSet = this.state.schedule;
        newScheduleSet.splice(key, 1);
        console.log(newScheduleSet)
        // this.setState({...this.state,schedule: newScheduleSet})
    }
    submit(){
        let date= new Date(this.state.schedule[0].time.seconds*1000)
        console.log(date)
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
                            <tr>
                                <th>Time</th>
                                <th>Description</th>
                                <th>Remove</th>
                            </tr>
                            <tbody>
                                {this.state.schedule.map((scheduleItem, key)=>{
                                    let timeObject = Object.assign({},scheduleItem.time);
                                    let time=scheduleItem.time;
                                    if(scheduleItem.time.seconds){
                                        time = new Date(timeObject.seconds*1000);
                                    }
                                    let timestampTime = ""
                                    if(scheduleItem.time != null){
                                        timestampTime=time.toLocaleTimeString('en-US', {hour: '2-digit', minute: "2-digit"});
                                    }
                                    return (
                                        <tr className="scheduleItem">
                                            <td><p>{timestampTime ? timestampTime: ""}</p><input type="time" className="currentTime" onChange={(time)=> {
                                                if(time.target.value)this.onChangeTime(time.target.value, key)}
                                            }/></td>
                                            <td><textarea class="scheduleDescription" key={key} defaultValue={this.state.schedule[key].description} onChange={(e)=>this.onChangeDescription(e,key)}/></td>
                                            <td><div className="removeButton" onClick={()=>this.removeSchedule(key)}>Remove</div></td>
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