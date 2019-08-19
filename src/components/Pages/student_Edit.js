import React from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import {setUser, userResetChanged} from '../../Action'
import * as ROUTES from '../../constants/routes';
class Student_Edit extends React.Component {
   constructor(props){
      super(props);
      this.state={
         user: this.props.selected,
         id: this.props.selected.id,
         Group_Name: this.props.selected.GroupName,
         userType: this.props.selected.userType,
         Username: this.props.selected.userName,
         firstName: this.props.selected.firstName,
         lastName: this.props.selected.lastName,
         Password: this.props.selected.password,
         tourGuideFirstName: this.props.selected.tourGuide.firstName,
         leadChaperoneFirstName: this.props.selected.leadChaperone.firstName,
         profilePicture: "#",
         name:this.props.selected.emergencyContact.name,
         phoneNumber: this.props.selected.emergencyContact.phoneNumber,
         relationship:this.props.selected.emergencyContact.relationship
         }
      }
   componentDidMount(){
      // // let Details= this.state.users.details;
      console.log(this.props.selected);
      console.log(this.props.changed);
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
   handleEdit(){
      let updatedUser = {
         id: this.state.user.id,
         GroupName: this.state.Group_Name,
         userType: this.state.userType,
         userName: this.state.Username,
         firstName: this.state.firstName,
         lastName: this.state.lastName,
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
            phoneNumber: this.state.phoneNumber,
            relationship: this.state.relationship
         }
      }
      this.props.setUser(updatedUser);
      this.props.history.push(ROUTES.USERS)
   }
   render() {
      return (
         <div>
            <br/><br/><br/><br/>
            <div>
               <center><h1>Edit Student User</h1></center>
            </div>
            <div className="add_Table_Styles">
               <form className="add_form">
               <center><h2>User Information</h2></center>
                  <label htmlFor="group_name"><b>Group Name: </b></label>
                  <select name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                  <option disabled selected defaultValue>{this.props.selected.GroupName}</option>
                     <option value="Band10018">Band10018</option>
                     <option value="Crazy Band">Crazy Band</option>
                     <option value="Band-001">Band-001</option>
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
                  <label htmlFor="name"><b>Password: </b></label>
                  <input type="text" name="name" onChange={this.onChangePassword.bind(this)} placeholder={this.props.selected.password} required/><br/><br/>
                  <label htmlFor="guide"><b>Tour Guide: </b></label> 
                  <input type="text" name="guide" onChange={this.onChangeTourGuide.bind(this)} placeholder={this.props.selected.tourGuide.firstName} required/><br/><br/>
                  <label htmlFor="chaperone"><b>Chaperone: </b></label>
                  <input type="text" name="chaperone" onChange={this.onChangeChaperone.bind(this)} placeholder={this.props.selected.leadChaperone.firstName} required/><br/><br/>
                  <hr/><br/>
                  <center><h2>Emergency Contact Information</h2></center>
                  <label htmlFor="name"><b>Full Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeFullName.bind(this)} placeholder={this.props.selected.emergencyContact.name} required/><br/><br/>
                  <label htmlFor="name"><b>Phone Number: </b></label>
                  <input type="text" name="name" onChange={this.onChangePhoneNumber.bind(this)} placeholder={this.props.selected.emergencyContact.phoneNumber} required/><br/><br/>
                  <label htmlFor="name"><b>Relationship: </b></label>
                  <input type="text" name="name" onChange={this.onChangeRelationship.bind(this)} placeholder={this.props.selected.emergencyContact.relationship} required/><br/><br/>
                  <button type="button" className="student_Update" onClick={()=>this.handleEdit()}>Update User</button>
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
   userChanged: state.userState.userChanged
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {setUser, userResetChanged}
   ),withAuthorization(condition)
)(Student_Edit);

// export default withAuthorization(condition)(Add_User);