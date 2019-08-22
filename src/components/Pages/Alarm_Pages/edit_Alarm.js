import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {editAlarm, alarmChanged} from '../../../Action/alarmAction'
class Edit_Alarm extends React.Component {
   constructor(props){
      super(props);
      this.state={
         selectedAlarm: this.props.selectedAlarm,
         id: this.props.selectedAlarm.id,
         Group_Pin: this.props.selectedAlarm.groupPin,
         message: this.props.selectedAlarm.title,
         timestamp: this.props.selectedAlarm.timestamp,
         original_Name :"",
         Group_Name: "",
         date: "",
         time: ""
         }
      }
   componentDidMount(){
      //getting the group name 
      let groupPin= this.state.Group_Pin;
      let group=Object.assign([{}])
      group= this.props.groups.filter(function(group){
          return (group.pin == groupPin)
      })
      let selectedGroup=Object.assign({},group[0])
      let groupName=selectedGroup.name;
      this.setState({Group_Name: groupName, original_Name: groupName})

      //getting the date
      let timeObject = Object.assign({},this.state.timestamp);
      let date= new Date(timeObject.seconds*1000)
      let timestampTime= date.toLocaleTimeString('en-US', {hour: '2-digit', minute: "2-digit"})
      let tempDate= date.toLocaleDateString('en-US');
      tempDate= tempDate.split("/");
      if(tempDate[0].length<2){
         tempDate[0]="0"+tempDate[0];
      }
      let valueDate=""+tempDate[2]+"-"+tempDate[0]+"-"+tempDate[1]+"";
      let valueTime= timestampTime.split(" ");
      this.setState({date: valueDate});
      // this.setState({time: timestampTime});
      let dayTime = valueTime[1];
      var hr =""
      let setTime=valueTime[0];
      if(dayTime=="PM"){
         let arrTime=valueTime[0].split("");
         hr=parseInt(arrTime[1])+12
         setTime= ""+hr+":"+arrTime[3]+arrTime[4]
      }
      this.setState({time: setTime})
      
   }
   componentDidUpdate(){
      if(this.props.alarmChanging){
            this.props.alarmChanged()
            this.props.history.push('/alarms');
         }
   }
   onChangeGroupName(event){
      return (
         this.setState({...this.state, Group_Name: event.target.value})
      )
   }
   onChangeGroupPin(event){
      return (
         this.setState({...this.state, Group_Pin: event.target.value})
      )
   }
   onChangeMessage(event){
      return (
         this.setState({...this.state, message: event.target.value})
      )
   }
   onChangeDate(event){
      return(
         this.setState({...this.state, date: event.target.value})
      )
   }
   onChangeTime(event){
      return(
         this.setState({...this.state, time: event.target.value})
      )
   }
   onHandleEdit(){
      //setting up the timestamp
      let myDate=this.state.date;
      myDate=myDate.split("-");
      let newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
      let temp= newDate + " " + this.state.time; 
      let date= new Date(temp)

      //getting the group name
      let groupPin= this.props.selectedAlarm.groupPin;
      if(this.state.original_Name!=this.state.Group_Name){
         let groupName= this.state.Group_Name;
         let group=Object.assign([{}])
         group= this.props.groups.filter(function(group){
            return (group.name == groupName)
         })
         let selectedGroup=Object.assign({},group[0])
         groupPin=selectedGroup.pin;
      }

      //setting up new alarm
      let newAlarm= {
         id: this.state.id,
          groupPin: groupPin,
          notifType: "alarm",
          timestamp: date,
          title: this.state.message
      }
      //called alarm action toset alarm in firebase
      this.props.editAlarm(newAlarm)
   }
   render() {
      return (
         <div>
            <br/><br/><br/><br/>
            <div className="add_Table_Styles">
            <div className="editFormHeading"><h1>Alarm Management</h1></div>
               <form className="add_form">
                  <center><h2>Edit Alarm Information</h2></center>
                  <label htmlFor="group_name"><b>Group Name: </b></label>
                  <select name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                    <option disabled selected defaultValue>{this.state.Group_Name}</option>
                        {this.props.groups.map(function(group){
                            return (<option value={group.name}>{group.name}</option>)
                        })}
                  </select>
                  <label htmlFor="Alarm_Date"><b>Date: </b></label>
                  <input type="date" name="Alarm_Date" value={this.state.date} onChange={this.onChangeDate.bind(this)} required></input>
                  <label htmlFor="Alarm_Time"><b>Time: </b></label>
                  <input type="time" name="Alarm_Time" value={this.state.time} onChange={this.onChangeTime.bind(this)} required/><br/><br/>
                  <div className="groupTextField"><label htmlFor="group_info"><b>Group Description: </b></label>
                  <textarea rows="4" cols="28" name="group_info" placeholder={this.props.selectedAlarm.title} onChange={this.onChangeMessage.bind(this)}></textarea></div><br/><br/>
                  <button type="button" className="update_Button" onClick={()=>this.onHandleEdit()}>Update Alarm</button>
               </form>
            </div>
         </div>
      );
   }
}
const mapStateToProps = state => ({
   groups: state.groupState.groups,
   selectedAlarm: state.alarmState.selectedAlarm,
   alarmChanging: state.alarmState.alarmChanging
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {editAlarm, alarmChanged}
   ),withAuthorization(condition)
)(Edit_Alarm);

