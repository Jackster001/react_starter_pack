import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {addAlarm, alarmAdded} from '../../../Action/alarmAction'
import * as ROUTES from '../../../constants/routes';

class Send_Notification extends React.Component {
   constructor(props){
      super(props);
      this.state={
            userAccounts:[{
                userType: "Director",
                firstName: "Tour",
                lastName: "Management"
            },{
                userType: "Tour Guide",
                firstName: "Tour",
                lastName: "Management"
            },{
                userType: "Lead Chaperone",
                firstName: "Tour",
                lastName: "Management"
            }],
            groupName: "",
            sender: {},
            message: ""
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
    addNotification(){
        //setting the current timestamp
        // let myDate=this.state.date;
        // myDate=myDate.split("-");
        // let newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
        // let temp= newDate + " " + this.state.time; 
        // let date= new Date(temp)
        let timeStamp = Math.floor(Date.now() / 1000);
        let date= new Date(timeStamp);

        //called alarm action to add to firebase
        // this.props.addAlarm(newAlarm)
    }
    render() {
        return (
            <div>
                <br/><br/><br/><br/>
                <div className="add_Table_Styles">
                <div className="addFormHeading"><h1>Send a Notification</h1></div>
                <form className="add_form">
                    <center><h2>Notification Details</h2></center><br/>
                    <label htmlFor="group_name"><b>Group Name: </b></label>
                    <select name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                    <option disabled selected defaultValue> -- select an option -- </option>
                        {this.props.groups.map(function(group){
                            return (<option value={group.name}>{group.name}</option>)
                        })}
                    </select>
                    <label htmlFor="sender"><b>Sender: </b></label>
                    <select name="sender" onChange={this.onChangeGroupName.bind(this)} required>
                    <option disabled selected defaultValue> -- select an option -- </option>
                        {this.state.userAccounts.map(function(user){
                            return (<option value={user}>{user.userType}{": "}{user.firstName}{" "}{user.lastName}</option>)
                        })}
                    </select>
                    <div className="formTextField"><label htmlFor="notification"><b>Notification: </b></label>
                    <textarea className="addTextArea" name="notification" onChange={this.onChangeAlarmMessage.bind(this)}></textarea></div><br/><br/>
                    <button type="button" className="Submit_Button" onClick={()=>this.addNotification()}>Send Notification</button>
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
)(Send_Notification);