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
         dateCreated: this.props.selected.dateCreated,
         groupName: this.props.selected.groupName,
         Group_Pin: this.props.selected.groupPin,
         userType: this.props.selected.userType,
         Username: this.props.selected.userName,
         firstName: this.props.selected.firstName,
         lastName: this.props.selected.lastName,
         userPhoneNumber: this.props.selected.phoneNumber,
         Password: this.props.selected.password,
         tourGuide: this.props.selected.tourGuide,
         leadChaperone: this.props.selected.leadChaperone,
         profilePicture: this.props.selected.profilePicture,
         name:this.props.selected.emergencyContact.name,
         emergencyPhoneNumber: this.props.selected.emergencyContact.number+"",
         relationship:this.props.selected.emergencyContact.relationship,
         avaliableTourGuides: [],
         avaliableLeadChaperones: []
         }
      }
   componentDidMount(){
      console.log(this.props.selected)
      console.log(this.props.selected.tourGuide)
      let groupPin= this.state.Group_Pin;

      let avaliableTourGuides=this.props.users.filter(user=>{
         return user.userType === 'Tour Guide' && user.groupPin === groupPin
      })
      let avaliableLeadChaperones=this.props.users.filter(user=>{
         return user.userType === 'Lead Chaperone' && user.groupPin === groupPin
      })
      this.setState({...this.state, avaliableTourGuides: avaliableTourGuides, avaliableLeadChaperones: avaliableLeadChaperones})
   }
   onChangeGroupName(event){
      let avaliableTourGuides=this.props.users.filter(user=>{
         return user.userType === 'Tour Guide' && user.groupName === event.target.value
      })
      let avaliableLeadChaperones=this.props.users.filter(user=>{
         return user.userType === 'Lead Chaperone' && user.groupName === event.target.value
      })
      this.setState({...this.state, groupName: event.target.value, avaliableTourGuides: avaliableTourGuides, avaliableLeadChaperones: avaliableLeadChaperones})  
   }
   componentDidUpdate(){
      if(this.props.userChanged){
         this.props.userResetChanged()
         this.props.history.push(ROUTES.USERS);
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
         this.setState({...this.state, tourGuide:JSON.parse(event.target.value)})
      )
   }
   onChangeChaperone(event){
      return (
         this.setState({...this.state, leadChaperone: JSON.parse(event.target.value)})
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
      if(emergencyPhoneNumber == null){
         emergencyPhoneNumber= ""
      }
      let updatedUser = {
         id: this.state.user.id,
         dateCreated: this.state.dateCreated,
         groupName: this.state.groupName,
         groupPin: this.state.Group_Pin,
         userType: this.state.userType,
         userName: this.state.Username,
         firstName: this.state.firstName,
         lastName: this.state.lastName,
         phoneNumber: this.state.userPhoneNumber,
         password: this.state.Password,
         tourGuide:  this.state.tourGuide,
         leadChaperone: this.state.leadChaperone,
         profilePicture: this.state.profilePicture,
         emergencyContact:{
            name: this.state.name,
            number: emergencyPhoneNumber,
            relationship: this.state.relationship
         }
      }
      this.props.setUser(updatedUser);
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
                    <option disabled selected defaultValue>{this.state.groupName}</option>
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
                     <option value="Guest">Guest</option>
                  </select><br/><br/>
                  <label htmlFor="name"><b>Username: </b></label>
                  <input type="text" name="name" onChange={this.onChangeUsername.bind(this)} defaultValue={this.props.selected.userName} required/><br/><br/>
                  <label htmlFor="name"><b>First Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeFirstName.bind(this)} defaultValue={this.props.selected.firstName} required/><br/><br/>
                  <label htmlFor="name"><b>Last Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeLastName.bind(this)} defaultValue={this.props.selected.lastName} required/><br/><br/>
                  <label htmlFor="name"><b>Phone Number: </b></label>
                  <input type="text" name="name" onChange={this.onChangePhoneNumber.bind(this)} defaultValue={this.props.selected.phoneNumber} required/><br/><br/>
                  <label htmlFor="name"><b>Password: </b></label>
                  <input type="text" name="name" onChange={this.onChangePassword.bind(this)} defaultValue={this.props.selected.password} required></input><br/><br/>
                  <label htmlFor="guide"><b>Tour Guide: </b></label> 
                  <select name="guide" onChange={this.onChangeTourGuide.bind(this)} required>
                  <option disabled selected defaultValue> -- select an option -- </option>
                        {this.state.avaliableTourGuides.map(function(user, key){
                           let tourGuide={
                              firstName: user.firstName,
                              lastName: user.lastName,
                              id: user.id
                           }
                           return (<option key={key} value={JSON.stringify(tourGuide)}>{`${user.firstName} ${user.lastName}`}</option>)
                        })}
                  </select><br/><br/>
                  <label htmlFor="chaperone"><b>Lead Chaperone: </b></label>
                  <select name="guide" onChange={this.onChangeChaperone.bind(this)} required>
                    <option disabled selected defaultValue> -- select an option -- </option>
                        {this.state.avaliableLeadChaperones.map(function(user, key){
                           let leadChaperone={
                              firstName: user.firstName,
                              lastName: user.lastName,
                              id: user.id
                           }
                           return (<option key={key} value={JSON.stringify(leadChaperone)}>{`${user.firstName} ${user.lastName}`}</option>)
                        })}
                  </select><br/><br/>
                  <hr/><br/>
                  <center><h2>Emergency Contact Information</h2></center><br/>
                  <label htmlFor="name"><b>Full Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeFullName.bind(this)} defaultValue={this.props.selected.emergencyContact.name} required/><br/><br/>
                  <label htmlFor="name"><b>Phone Number: </b></label>
                  <input type="text" name="name" onChange={this.onChangeEmergencyPhoneNumber.bind(this)} defaultValue={this.state.emergencyPhoneNumber} required/><br/><br/>
                  <label htmlFor="name"><b>Relationship: </b></label>
                  <input type="text" name="name" onChange={this.onChangeRelationship.bind(this)} defaultValue={this.props.selected.emergencyContact.relationship} required/><br/><br/>
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