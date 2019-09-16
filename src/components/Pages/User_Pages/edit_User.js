import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {setUser, userResetChanged} from '../../../Action'
import * as ROUTES from '../../../constants/routes';
class User_Edit extends React.Component {
   constructor(props){
      super(props);
      this.state={
         user: this.props.selected,
         id: this.props.selected.id,
         Group_Name: "",
         original_Name :"",
         GroupName: this.props.GroupName,
         Group_Pin: this.props.selected.groupPin,
         userType: this.props.selected.userType,
         Username: this.props.selected.userName,
         firstName: this.props.selected.firstName,
         lastName: this.props.selected.lastName,
         userPhoneNumber: this.props.selected.phoneNumber,
         Password: this.props.selected.password,
         tourGuideFirstName: this.props.selected.tourGuide.firstName,
         leadChaperoneFirstName: this.props.selected.leadChaperone.firstName,
         profilePicture: this.props.selected.profilePicture,
         name:this.props.selected.emergencyContact.name,
         emergencyphoneNumber: this.props.selected.emergencyContact.phoneNumber+"",
         relationship:this.props.selected.emergencyContact.relationship
         }
      }
   componentDidMount(){
      //getting the group name 
      let groupPin= this.state.Group_Pin;
      let group=Object.assign([{}])
      group= this.props.groups.filter(function(group){
         return (group.pin == groupPin);
      })
      let selectedGroup=Object.assign({},group[0]);
      let groupName=selectedGroup.name;
      console.log(this.state.user);
      this.setState({Group_Name: groupName, original_Name: groupName})
   }
   onChangeGroupName(event){
      console.log(event.target.value)
      return (
         this.setState({...this.state, Group_Name: event.target.value})
      )
   }
   componentDidUpdate(){
   if(this.props.userChanged){
         this.props.userResetChanged()
         console.log(this.props.changed);

         this.props.history.push('/student/'+this.props.id);
      }
      
  }
   onChangeUserType(event){
      return (
         this.setState({...this.state, userType: event.target.value})
      )
   }
   onChangeUsername(event){
      return (
         this.setState({...this.state, Username: event.target.value})
      )
   }
   onChangeFirstName(event){
      return (
         this.setState({...this.state, firstName: event.target.value})
      )
   }
   onChangeLastName(event){
      return (
         this.setState({...this.state, lastName: event.target.value})
      )
   }
   onChangePhoneNumber(event){
      return (
         this.setState({...this.state, userPhoneNumber: event.target.value})
      )
   }
   onChangePassword(event){
      return (
         this.setState({...this.state, Password: event.target.value})
      )
   }
   onChangeTourGuide(event){
      return (
         this.setState({...this.state, tourGuideFirstName: event.target.value})
      )
   }
   onChangeChaperone(event){
      return (
         this.setState({...this.state, leadChaperoneFirstName: event.target.value})
      )
   }
   onChangeFullName(event){
      return (
         this.setState({...this.state, name: event.target.value})
      )
   }
   onChangeEmergencyPhoneNumber(event){
      return (
         this.setState({...this.state, phoneNumber: event.target.value})
      )
   }
   onChangeRelationship(event){
      return (
         this.setState({...this.state, relationship: event.target.value})
      )
   }
   handleEdit(){
      let groupPin= this.props.groups.filter((group)=>{
         if(group.name === this.state.Group_Name){
            return(group.pin)
         }
      })
      let emergencyPhoneNumber= this.state.emergencyPhoneNumber;
      if(emergencyPhoneNumber === "undefined"){
         emergencyPhoneNumber= ""
      }
      let updatedUser = {
         id: this.state.user.id,
         GroupName: this.state.Group_Name,
         groupPin: groupPin[0],
         userType: this.state.userType,
         userName: this.state.Username,
         firstName: this.state.firstName,
         lastName: this.state.lastName,
         phoneNumber: this.state.userPhoneNumber,
         password: this.state.Password,
         tourGuide: {
            firstName: this.state.tourGuideFirstName,
            lastName: this.props.selected.lastName,
            id: this.props.selected.id
         },
         leadChaperone: {
            firstName: this.state.leadChaperoneFirstName,
            lastName: this.props.selected.lastName,
            id: this.props.selected.id
         },
         profilePicture: this.state.profilePicture,
         emergencyContact:{
            name: this.state.name,
            phoneNumber: emergencyPhoneNumber,
            relationship: this.state.relationship
         }
      }
      console.log(updatedUser)
      // this.props.setUser(updatedUser);
      // this.props.history.push(ROUTES.USERS);
   }
   render() {
      return (
         <div>
            <br/><br/><br/><br/>
            <div className="add_Table_Styles">
               <div className="editFormHeading"><h1>User Management</h1></div>
               <img className="group_Logo_Edit" src={this.props.selected.profilePicture}/>
               <form className="add_form">
               <center><h2>Edit User Information</h2></center><br/>
                  <label htmlFor="group_name"><b>Group Name: </b></label>
                  <select name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                    <option disabled selected defaultValue>{this.state.Group_Name}</option>
                        {this.props.groups.map(function(group){
                            return (<option value={group.name}>{group.name}</option>)
                        })}
                  </select><br/><br/>
                  <label htmlFor="group_type"><b>User Type: </b></label>
                  <select name="group_type" onChange={this.onChangeUserType.bind(this)} required>
                  <option disabled selected defaultValue>{this.props.selected.userType}</option>
                     <option value="Student">Student</option>
                     <option value="Director">Director</option>
                     <option value="Tour Guide">Tour Guide</option>
                     <option value="Lead Chaperone">Lead Chaperone</option>
                     <option value="Parent">Parent</option>
                  </select><br/><br/>
                  <label htmlFor="name"><b>Username: </b></label>
                  <input type="text" name="name" onChange={this.onChangeUsername.bind(this)} placeholder={this.props.selected.userName} required/><br/><br/>
                  <label htmlFor="name"><b>First Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeFirstName.bind(this)} placeholder={this.props.selected.firstName} required/><br/><br/>
                  <label htmlFor="name"><b>Last Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeLastName.bind(this)} placeholder={this.props.selected.lastName} required/><br/><br/>
                  <label htmlFor="name"><b>Phone Number: </b></label>
                  <input type="text" name="name" onChange={this.onChangePhoneNumber.bind(this)} placeholder={this.props.selected.phoneNumber} required/><br/><br/>
                  <label htmlFor="name"><b>Password: </b></label>
                  <input type="text" name="name" onChange={this.onChangePassword.bind(this)} placeholder={this.props.selected.password} required/><br/><br/>
                  <label htmlFor="guide"><b>Tour Guide: </b></label> 
                  <input type="text" name="guide" onChange={this.onChangeTourGuide.bind(this)} placeholder={this.props.selected.tourGuide.firstName} required/><br/><br/>
                  <label htmlFor="chaperone"><b>Chaperone: </b></label>
                  <input type="text" name="chaperone" onChange={this.onChangeChaperone.bind(this)} placeholder={this.props.selected.leadChaperone.firstName} required/><br/><br/>
                  <hr/><br/>
                  <center><h2>Emergency Contact Information</h2></center><br/>
                  <label htmlFor="name"><b>Full Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeFullName.bind(this)} placeholder={this.props.selected.emergencyContact.name} required/><br/><br/>
                  <label htmlFor="name"><b>Phone Number: </b></label>
                  <input type="text" name="name" onChange={this.onChangeEmergencyPhoneNumber.bind(this)} placeholder={this.props.selected.emergencyContact.phoneNumber} required/><br/><br/>
                  <label htmlFor="name"><b>Relationship: </b></label>
                  <input type="text" name="name" onChange={this.onChangeRelationship.bind(this)} placeholder={this.props.selected.emergencyContact.relationship} required/><br/><br/>
                  <button type="button" className="update_Button" onClick={()=>this.handleEdit()}>Update User</button>
               </form>
         </div></div>
      );
   }
}
const mapStateToProps = state => ({
   users: state.userState.users,
   selected: state.userState.selected,
   changed: state.userState.selected,
   listLoading: state.userState.listLoading,
   userChanged: state.userState.userChanged,
   groups: state.groupState.groups
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {setUser, userResetChanged}
   ),withAuthorization(condition)
)(User_Edit);