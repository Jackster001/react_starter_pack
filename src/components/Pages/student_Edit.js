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
         user: this.props.selected,
         id: this.props.selected.id,
         Group_Name: this.props.selected.Group_Name,
         Group_Type: this.props.selected.Group_Type,
         Details: this.props.selected.Details,
         Tour_Guide: this.props.selected.Tour_Guide,
         Chaperone: this.props.selected.Group_Name,
         profilePicture: "#"
         }
      }
   componentDidMount(){
      // // let Details= this.state.users.details;
      console.log(this.props.selected);
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
      let id= this.state.user.id;
      let updatedUser = {
         Details: this.state.Details,
         Group_Name: this.state.Group_Name,
         Group_Type: this.state.Group_Type,
         Tour_Guide: this.state.Tour_Guide,
         Chaperone: this.state.Chaperone,
         profilePicture: this.state.profilePicture
      }
      this.props.setUser(updatedUser, id);
      this.props.history.push(ROUTES.USERS)
   }
   render() {
      return (
         <div>
            <br/><br/><br/><br/>
            <div>
               <center><h1>Edit Student User</h1></center>
            </div>
            <div className="add_User_Styles">
               <form className="add_form">
                  <label htmlFor="group_name"><b>Group Name: </b></label>
                  <input type="text" name="group_name" placeholder={this.state.user.Group_Name} onChange={this.onChangeGroupName.bind(this)} required/><br/><br/>
                  <label htmlFor="group_type"><b>Group Type: </b></label>
                  <input type="text" name="group_type" placeholder={this.state.user.Group_Type} onChange={this.onChangeGroup_Type.bind(this)} required/><br/><br/>
                  <label htmlFor="name"><b>Full Name: </b></label>
                  <input type="text" name="name" placeholder={this.state.user.Details} onChange={this.onChangeDetails.bind(this)} required/><br/><br/>
                  <label htmlFor="guide"><b>Tour Guide: </b></label>
                  <input type="text" name="guide" placeholder={this.state.user.Tour_Guide} onChange={this.onChangeTourGuide.bind(this)} required/><br/><br/>
                  <label htmlFor="chaperone"><b>Chaperone: </b></label>
                  <input type="text" name="chaperone" placeholder={this.state.user.Chaperone} onChange={this.onChangeChaperone.bind(this)} required/><br/><br/>
                  <button type="button" className="student_Update" onClick={()=>this.handleEdit()}>Update User</button>
               </form>
         </div></div>
      );
   }
}
const mapStateToProps = state => ({
   users: state.userState.users,
   selected: state.userState.selected
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {setUser}
   ),withAuthorization(condition)
)(Student_Edit);

// export default withAuthorization(condition)(Add_User);