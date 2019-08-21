import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {addAlarm, alarmAdded} from '../../../Action/alarmAction'
import * as ROUTES from '../../../constants/routes';

class Add_Alarm extends React.Component {
   constructor(props){
      super(props);
      this.state={
            groupName: "",
            message: "",
            date: "",
            time:""
         }
    }
    componentDidUpdate(){
        if(this.props.alarmAdding){
            this.props.alarmAdded()
                this.props.history.push(ROUTES.ALARMS)
        }
    }
    onChangeGroupName(event){
        return (
            this.setState({...this.state, groupName: event.target.value})
        )
    }
    onChangeAlarmMessage(event){
        return (
            this.setState({...this.state, message: event.target.value})
        )
    }
    onChangeDate(event){
        return (
            this.setState({...this.state, date: event.target.value})
        )
    }
    onChangeTime(event){
        return (
            this.setState({...this.state, time: event.target.value})
        )
    }
    addAlarm(){
        //getting the timestamp
        let myDate=this.state.date;
        myDate=myDate.split("-");
        let newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
        let temp= newDate + " " + this.state.time; 
        let date= new Date(temp)

        //getting the group pin 
        let groupName= this.state.groupName;
        let group=Object.assign([{}])
        group= this.props.groups.filter(function(group){
            return (group.name == groupName)
        })
        let selectedGroup=Object.assign({},group[0])
        let groupPin=selectedGroup.pin;

        //setting up new alarm
        let newAlarm= {
            groupPin: groupPin,
            timestamp: date,
            title: this.state.message
        }

        //called alarm action to add to firebase
        this.props.addAlarm(newAlarm)
    }
    render() {
        return (
            <div>
                <br/><br/><br/><br/>

                <div className="add_Table_Styles">
                <div className="addFormHeading"><h1>Alarm Management</h1></div>
                <form className="add_form">
                    <center><h2>Alarm Details</h2></center>
                    <label htmlFor="group_name"><b>Group Name: </b></label>
                    <select name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                    <option disabled selected defaultValue> -- select an option -- </option>
                        {this.props.groups.map(function(group){
                            return (<option value={group.name}>{group.name}</option>)
                        })}
                    </select>
                    <label htmlFor="group_name"><b>Set Date: </b></label>
                    <input type="date" onChange={this.onChangeDate.bind(this)}></input>
                    <label htmlFor="group_name"><b>Set Time: </b></label>
                    <input type="time" onChange={this.onChangeTime.bind(this)}></input>
                    <div className="groupTextField"><label htmlFor="group_info"><b>Alarm Message: </b></label>
                    <textarea className="addGroupTextArea" name="group_info" onChange={this.onChangeAlarmMessage.bind(this)}></textarea></div><br/><br/>
                    <button type="button" className="Submit_Button" onClick={()=>this.addAlarm()}>Add Alarm</button>
                </form>
            </div>
            </div>
        );
    }
    }
const mapStateToProps = state => ({
    groups: state.groupState.groups,
    alarms: state.alarmState.alarms,
    alarmAdding: state.alarmState.alarmAdding
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {addAlarm, alarmAdded}
   ),withAuthorization(condition)
)(Add_Alarm);