import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {sendNotification, notificationSent} from '../../../Action/notificationAction'
import * as ROUTES from '../../../constants/routes';
import {fb} from "../../Firebase/firebase"
import * as firebase from "firebase";

class Send_Notification extends React.Component {
   constructor(props){
      super(props);
      this.state={
            userAccounts:[{
                userType: "Director",
                firstName: "Tour",
                lastName: "Management",
                profilePicture:""
            },{
                userType: "Tour Guide",
                firstName: "Tour",
                lastName: "Management",
                profilePicture:""
            },{
                userType: "Lead Chaperone",
                firstName: "Tour",
                lastName: "Management",
                profilePicture:""
            }],
            groupName: "",
            sender: 0,
            message: ""
         }
    }
    componentDidUpdate(){
        if(this.props.notificationSending){
            this.props.notificationSent()
                this.props.history.push(ROUTES.NOTIFICATIONS)
        }
    }
    onChangeGroupName(event){
        return (
            this.setState({...this.state, groupName: event.target.value})
        )
    }
    onChangeSender(event){
        return (
            this.setState({...this.state, sender: event.target.value})
        )
    }
    onChangeMessage(event){
        return (
            this.setState({...this.state, message: event.target.value})
        )
    }
    addNotification(){
        // let timeStamp = Math.floor(Date.now() / 1000);
        let date= firebase.firestore.Timestamp.fromDate(new Date());
        // let date= new Date();

        // let myDate=this.state.date;
        // myDate=myDate.split("-");
        // let newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
        // let temp= newDate + " " + this.state.time; 
        // let date= new Date(temp)

        let sender = this.state.userAccounts[this.state.sender]
        let selectedGroup = this.props.groups.filter(group=>{
            return group.name === this.state.groupName
        })
        let pin="";
        if(selectedGroup){
            pin = selectedGroup[0].pin;
        }
        
        let newNotification={
            groupPin: pin,
            GroupName: this.state.groupName,
            notifType: "message",
            message: this.state.message,
            sender: sender,
            timestamp: date
        }
        this.props.sendNotification(newNotification)
        // console.log(date)
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
                    <select name="sender" onChange={this.onChangeSender.bind(this)} required>
                    <option disabled selected defaultValue> -- select an option -- </option>
                        {this.state.userAccounts.map(function(user, key){
                            return (<option value={key}>{user.userType}{": "}{user.firstName}{" "}{user.lastName}</option>)
                        })}
                    </select>
                    <div className="formTextField"><label htmlFor="notification"><b>Notification: </b></label>
                    <textarea className="addTextArea" name="notification" onChange={this.onChangeMessage.bind(this)}></textarea></div><br/><br/>
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
    alarmAdding: state.alarmState.alarmAdding,
    notificationSending: state.notificationState.notificationSending
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {sendNotification, notificationSent}
   ),withAuthorization(condition)
)(Send_Notification);