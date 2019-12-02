import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import UserRow from "./userRow"
import {userAddedChanged, recievingUsers,getUsers} from '../../../Action'
import {CSVLink } from 'react-csv';
import {DeleteModal} from './delete_modal'
class UserTable extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userList: this.props.users,
      targetList: this.props.users,
      csvFormat:[{}],
      show: false,
      groupName: "",
      userType: ""
      
    }
  }
  onChangeGroupName (event){
    let filteredUsers= this.props.users.filter(user=>{
      return user.groupName === event.target.value
    })
    this.setState({userList: filteredUsers, targetList: filteredUsers, groupName: event.target.value})
  }
  onChangeUserType (event){
    let filteredUsers= this.state.userList.filter(user=>{
      return user.userType === event.target.value
    })
    this.setState({targetList: filteredUsers, userType:event.target.value})
  }
  resetUserList(){
    this.setState({userList: this.props.users, targetList: this.props.users})
    document.getElementById("user_type").value= "User Type";
    document.getElementById("group_name").value= "Group";
  }
  downloadCSV(users){
    let csvFormat= [{}]
    users.map(function(user,i){
      csvFormat[i]={
        Group: user.GroupName,
        Pin: user.groupPin,
        User_Type: user.userType,
        Username: user.userName,
        First_Name: user.firstName,
        Last_Name: user.lastName,
        Phone_Number: user.phoneNumber,
        Tour_Guide: user.tourGuide.firstName,
        Lead_Chaperone: user.leadChaperone.firstName,
        Emergency_Contact_Name: user.emergencyContact.name,
        Relationship: user.emergencyContact.relationship,
        Emergrancy_Contact_Number : user.emergencyContact.number
      }
    })
    this.setState({csvFormat: csvFormat})
  }
  showModal = () => {
    this.setState({...this.state, show: true})
  };
  hideModal = () => {
    this.setState({...this.state, show: false})
  };
  render() {
      return (
          <div className="basicTable">
            <div className="filterBox">
            <select id="group_name" name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
              <option disabled selected defaultValue>Group</option>
                  {this.props.groups.map(function(group){
                    return (<option value={group.name}>{group.name}</option>)
              })}
            </select>
            <select id="user_type" name="user_type" onChange={this.onChangeUserType.bind(this)} required>
              <option disabled selected defaultValue>User Type</option>
                     <option value="Student">Student</option>
                     <option value="Director">Director</option>
                     <option value="Tour Guide">Tour Guide</option>
                     <option value="Lead Chaperone">Lead Chaperone</option>
                     <option value="Parent">Parent</option>
              })}
            </select>
            <button className="resetFilterButton" onClick={()=>this.resetUserList()}>Reset</button>
            <CSVLink id="csv" data={this.state.csvFormat} onClick={()=>this.downloadCSV(this.state.targetList)}><button className="downloadCSV">Download CSV</button></CSVLink>
            <br/><br/>
            </div>
            <table className="table1 table-dark" border="1" cellSpacing="0">
             <thead className="TableHead">
               <tr>
                <th>User Type</th>
                <th>Group Name</th>
                <th>Details</th>
                <th>Emergency Contact</th>
                <th>Profile Picture</th>
                <th>Tour Guide</th>
                <th>Chaperone</th>
                <th>Edit</th>
               </tr>
             </thead>
             <tbody>
              { this.state.targetList.map(function(user, i){
                let data= Object.assign({},user.emergencyContact)
                let tourGuide =Object.assign({}, user.tourGuide)
                let leadChaperone= Object.assign({}, user.leadChaperone)
                return(<UserRow key={i}
                  id={user.id} 
                  Group_Type={user.userType}
                  Group_Name={user.groupName}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  phoneNumber={user.phoneNumber}
                  emergencyName={data.name}
                  emergencyNumber={data.phoneNumber}
                  emergencyRelationship={data.relationship}
                  tourGuideFirstName={tourGuide.firstName}
                  tourGuideLastName={tourGuide.lastName}
                  leadChaperoneFirstName={leadChaperone.firstName}
                  leadChaperoneLastName={leadChaperone.lastName}
                  profilePicture={user.profilePicture}
                  />)
                })}
              </tbody>
            </table>
         </div>
      );
   }
}
const mapStateToProps = state => ({
  users: state.userState.users,
  userAdded: state.userState.userAdded,
  groups: state.groupState.groups,
  gettingUsers: state.userState.gettingUsers
});
 
export default compose(
   connect(
     mapStateToProps,
     {userAddedChanged, recievingUsers, getUsers}
   ),
)(UserTable);