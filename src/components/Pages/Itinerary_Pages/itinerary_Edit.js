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
            schedule:[],
            date: this.props.selectedItinerary.date,
            newScheduleSet:[],
            length: this.props.selectedItinerary.length
        }
    }
    componentDidMount(){
        let date= new Date(this.state.date.seconds*1000)
        this.setState({date:date})
        let tempSchedule= this.props.selectedItinerary.activities;
        let tempArr=[]
        for(let i=0; i< this.state.length; i++){
            let time=tempSchedule[i].time
            tempSchedule[i].time=time
            tempArr.push(tempSchedule[i])
        }
        console.log(tempArr)
        this.setState({schedule: tempArr})
    }
    componentDidUpdate(){
        if(this.props.itineraryChanging){
            this.props.itineraryChanged();
            this.props.history.push('/itineraries');
        }
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
        let date= new Date();
        scheduleSet.push({description,time:date})
        let length=this.state.length + 1;
        this.setState({schedule: scheduleSet, length: length});
    }
    removeSchedule(key){
        let newScheduleSet = this.state.schedule;
        newScheduleSet.splice(key,1)
        console.log(newScheduleSet)
        this.setState({...this.state,schedule: newScheduleSet})
    }

    submit(){
        let schedules= this.state.schedule;
        let date = this.state.date;
        let month = date.getMonth();
        let day = date.getDate();
        let year= date.getFullYear();
        let scheduleObject={}
        let length=0;
        for(let i=0; i<schedules.length;i++){
            if(schedules[i].time.seconds==undefined){
                schedules[i].time.setMonth(month)
                schedules[i].time.setDate(day)
                schedules[i].time.setFullYear(year)
                let timestamp=schedules[i].time.getTime()/1000
                schedules[i].time={seconds:timestamp, nanoseconds: 0}
                scheduleObject[i]= schedules[i]
            }
            else{
                scheduleObject[i]= schedules[i]
            }
            length++;
        }
        let selectGroupItinerary=this.props.itineraryHead;
        let index=null;
        for(let i=0; i< selectGroupItinerary.dailyData.length; i++)
        {
            let tempDate;
            if(schedules[i] ==undefined || schedules[i].time==undefined){
                tempDate=new Date(selectGroupItinerary.dailyData[i].date.seconds*1000);
            }
            else{
                tempDate=new Date(selectGroupItinerary.dailyData[i].date.seconds*1000)
            }
            
            let tempYear=tempDate.getFullYear();
            let tempDay=tempDate.getDate();
            let tempMonth= tempDate.getMonth();
            if(year==tempYear && day==tempDay && tempMonth == month){
                index=i;
                break;
            }
        }
        selectGroupItinerary.dailyData[index].activities=scheduleObject
        selectGroupItinerary.dailyData[index].length=length
        this.props.editItinerary(selectGroupItinerary)
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
                                {/* {this.activityList()} */}
                                {this.state.schedule.map((scheduleItem, key)=>{
                                    let timeObject = Object.assign({},scheduleItem.time);
                                    let time=scheduleItem.time;
                                    if(scheduleItem.time.seconds){
                                        time = new Date(timeObject.seconds*1000);
                                    }
                                    let timestampTime = ""
                                    if(scheduleItem.time != null && time){
                                        timestampTime=time.toLocaleTimeString('en-US', {hour: '2-digit', minute: "2-digit"});
                                    }
                                    return (
                                        <tr className="scheduleItem">
                                            <td><p>{timestampTime ? timestampTime: ""}</p><input type="time" className="currentTime" onChange={(time)=> {
                                                if(time.target.value)this.onChangeTime(time.target.value, key)}
                                            }/></td>
                                            <td><textarea className="scheduleDescription" key={key} defaultValue={this.state.schedule[key].description} onChange={(e)=>this.onChangeDescription(e,key)}/></td>
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
    itineraries: state.itineraryState.itineraries,
    itineraryHead: state.itineraryState.itineraryHead,
    itineraryChanging: state.itineraryState.itineraryChanging
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {editItinerary, itineraryChanged}
    ),withAuthorization(condition)
)(ItineraryEdit);