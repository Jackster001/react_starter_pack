import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {addUser, userAddedChanged} from '../../../Action'
import * as ROUTES from '../../../constants/routes';
class Add_User extends React.Component {
   constructor(props){
      super(props);
      this.state={
            Group_Name: "",
            userType: "",
            Username: "",
            firstName: "",
            lastName: "",
            Password: "",
            userPhoneNumber: "",
            tourGuideFirstName: "",
            leadChaperoneFirstName: "",
            profilePicture: "",
            name:"",
            phoneNumber: "",
            relationship:''
         }
   }
   componentDidUpdate(){
      if(this.props.userAdded){
         this.props.userAddedChanged()
            this.props.history.push('/users')    
     }
   }
   onChangeGroupName(event){
      return (
         this.setState({...this.state, Group_Name: event.target.value})
      )
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
   onChangePassword(event){
      return (
         this.setState({...this.state, Password: event.target.value})
      )
   }
   onChangePhoneNumber(event){
      return (
         this.setState({...this.state, userPhoneNumber: event.target.value})
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
   onChangePhoneNumber(event){
      return (
         this.setState({...this.state, phoneNumber: event.target.value})
      )
   }
   onChangeRelationship(event){
      return (
         this.setState({...this.state, relationship: event.target.value})
      )
   }
   setUser(){
      let newUser = {
         GroupName: this.state.Group_Name,
         userType: this.state.userType,
         userName: this.state.Username,
         firstName: this.state.firstName,
         lastName: this.state.lastName,
         password: this.state.Password,
         phoneNumber:this.state.userPhoneNumber,
         tourGuide: {
            firstName:this.state.tourGuideFirstName,
            lastName: "",
            id:""
         },
         leadChaperone: {
            firstName: this.state.leadChaperoneFirstName,
            lastName: "",
            id: ""
         },
         emergencyContact:{
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            relationship: this.state.relationship
         }
      }
      this.props.addUser(newUser);
      console.log(newUser);
   }
   render() {
      return (
         <div>
            <br/><br/><br/><br/>
            <div className="add_Table_Styles">
            <div className="addFormHeading"><h1>User Management</h1></div>
               <form className="add_form">
                  <center><h2>User Information</h2></center><br/>
                  <label htmlFor="group_name"><b>Group Name: </b></label>
                  <select name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                    <option disabled selected defaultValue> -- select an option -- </option>
                        {this.props.groups.map(function(group){
                            return (<option value={group.name}>{group.name}</option>)
                        })}
                  </select><br/><br/>
                  <label htmlFor="group_type"><b>User Type: </b></label>
                  <select name="group_type" onChange={this.onChangeUserType.bind(this)} required>
                  <option disabled selected defaultValue> -- select an option -- </option>
                     <option value="Student">Student</option>
                     <option value="Director">Director</option>
                     <option value="Tour Guide">Tour Guide</option>
                     <option value="Lead Chaperone">Lead Chaperone</option>
                     <option value="Parent">Parent</option>
                  </select><br/><br/>
                  <label htmlFor="name"><b>Username: </b></label>
                  <input type="text" name="name" onChange={this.onChangeUsername.bind(this)} required/><br/><br/>
                  <label htmlFor="name"><b>First Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeFirstName.bind(this)} required/><br/><br/>
                  <label htmlFor="name"><b>Last Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeLastName.bind(this)} required/><br/><br/>
                  <label htmlFor="name"><b>Password: </b></label>
                  <input type="text" name="name" onChange={this.onChangePassword.bind(this)} required/><br/><br/>
                  <label htmlFor="guide"><b>Tour Guide: </b></label>
                  <input type="text" name="guide" onChange={this.onChangeTourGuide.bind(this)} required/><br/><br/>
                  <label htmlFor="chaperone"><b>Chaperone: </b></label>
                  <input type="text" name="chaperone" onChange={this.onChangeChaperone.bind(this)} required/><br/><br/>
                  <hr/><br/>
                  <center><h2>Emergency Contact Information</h2></center><br/>
                  <label htmlFor="name"><b>Full Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeFullName.bind(this)} required/><br/><br/>
                  <label htmlFor="name"><b>Phone Number: </b></label>
                  <input type="text" name="name" onChange={this.onChangePhoneNumber.bind(this)} required/><br/><br/>
                  <label htmlFor="name"><b>Relationship: </b></label>
                  <input type="text" name="name" onChange={this.onChangeRelationship.bind(this)} required/><br/><br/><br/>
                  <button type="button" className="Submit_Button" onClick={()=>this.setUser()}>Add User</button>
               </form>
         </div></div>
      );
   }
}
const mapStateToProps = state => ({
   users: state.userState.users,
   userAdded: state.userState.userAdded,
   groups: state.groupState.groups
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {addUser, userAddedChanged}
   ),withAuthorization(condition)
)(Add_User);