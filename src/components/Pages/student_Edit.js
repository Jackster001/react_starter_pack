import React from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import {setUser} from '../../Action'
import * as ROUTES from '../../constants/routes';
class Student_Edit extends React.Component {
   constructor(props){
      super(props);
      this.state={
         // user:this.props.users.filter(function(user){return user.Id == this.props.match.params})
            // Details: this.props.users.Details,
            // Group_Name: this.props.users.Group_Name,
            // Group_Type: this.props.users.Group_Type,
            // Tour_Guide: this.props.users.Tour_Guide,
            // Chaperone: this.props.users.Chaperone,
            // profilePicture: "#",
         }
      }
   // initialState={
   //       Details: this.state.Details,
   //       Group_Name: this.state.Group_Name,
   //       Group_Type: this.state.Group_Type,
   //       Tour_Guide: this.state.Tour_Guide,
   //       Chaperone: this.state.Chaperone,
   //       profilePicture: "#"
   // }
   // onChange methods
   componentDidMount(){
      // let user=this.props.users.filter(function(user){return user.Id == this.props.match.params})
      // console.log(user);
   }
   onChangeDetails(event){
      return (
         this.setState({...this.state, Details: event.target.value})
      )
   }
   onChangeGroupName(event){
      return (
         this.setState({...this.state, Group_Name: event.target.value})
      )
   }
   onChangeGroup_Type(event){
      return (
         this.setState({...this.state, Group_Type: event.target.value})
      )
   }
   onChangeTourGuide(event){
      return (
         this.setState({...this.state, Tour_Guide: event.target.value})
      )
   }
   onChangeChaperone(event){
      return (
         this.setState({...this.state, Chaperone: event.target.value})
      )
   }
   handleEdit(){
      let updatedUser = {
         Details: this.state.Details,
         Group_Name: this.state.Group_Name,
         Group_Type: this.state.Group_Type,
         Tour_Guide: this.state.Tour_Guide,
         Chaperone: this.state.Chaperone,
         profilePicture: this.state.profilePicture
      }
      this.props.setUser(updatedUser);
      console.log(updatedUser);
      this.props.history.push(ROUTES.USERS)
   }
   render() {
      return (
         <div>
            <div>
               <center><h1>Edit Student User</h1></center>
            </div>
            <div className="add_User_Styles">
               <form className="add_form">
                  <label htmlFor="group_name"><b>Group Name: </b></label>
                  <input type="text" name="group_name" placeholder={this.state.Group_Name} onChange={this.onChangeGroupName.bind(this)} required/><br/><br/>
                  <label htmlFor="group_type"><b>Group Type: </b></label>
                  <input type="text" name="group_type" onChange={this.onChangeGroup_Type.bind(this)} required/><br/><br/>
                  <label htmlFor="name"><b>Full Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeDetails.bind(this)} required/><br/><br/>
                  <label htmlFor="guide"><b>Tour Guide: </b></label>
                  <input type="text" name="guide" onChange={this.onChangeTourGuide.bind(this)} required/><br/><br/>
                  <label htmlFor="chaperone"><b>Chaperone: </b></label>
                  <input type="text" name="chaperone" onChange={this.onChangeChaperone.bind(this)} required/><br/><br/>
                  <button type="button" className="student_Submit" onClick={()=>this.setUser()}>Add User</button>
               </form>
         </div></div>
      );
   }
}
const mapStateToProps = state => ({
   users: state.userState.users,
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {setUser}
   ),withAuthorization(condition)
)(Student_Edit);

// export default withAuthorization(condition)(Add_User);