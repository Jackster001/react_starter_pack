import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {addGroup, groupAdded} from '../../../Action/groupAction'
import * as ROUTES from '../../../constants/routes';
class Add_Group extends React.Component {
   constructor(props){
      super(props);
      this.state={
            Group_Name: "",
            Group_Pin: "",
            startDate: "",
            endDate: "",
            Group_Logo: {}
         }
   }
   componentDidUpdate(){
      if(this.props.groupAdding){
         this.props.groupAdded()
            this.props.history.push('/groups')
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
   onChangeGroupInformation(event){
      return (
         this.setState({...this.state, Group_Information: event.target.value})
      )
   }
   onChangeStartDate(event){
      return(
         this.setState({...this.state, startDate: event.target.value})
      )
   }
   onChangeEndDate(event){
      return(
         this.setState({...this.state, endDate: event.target.value})
      )
   }
   onChangeRef(){
      const file = this.file.files[0];
      return(
      this.setState({Group_Logo: file}) 
      )
   }
   setRef = ref =>{
      this.file = ref
   }
   addGroup(){
      let parts1= this.state.startDate.split('-');
      let date1= new Date(parts1[0], parts1[1]-1, parts1[2]);
      let parts2= this.state.endDate.split('-');
      let date2= new Date(parts2[0], parts2[1]-1, parts2[2]);
      let newGroup= {
          GroupName: this.state.Group_Name,
          GroupPin: this.state.Group_Pin,
          GroupLogo: this.state.Group_Logo,
          startDate: date1,
          endDate: date2
      }
      this.props.addGroup(newGroup);
   } 
   render() {
      return (
         <div>
            <br/><br/><br/><br/>
            <div className="add_Table_Styles">
            <div className="addFormHeading"><h1>Group Management</h1></div>
               <form className="add_form">
                  <center><h2>Group Information</h2></center><br/>
                  <label htmlFor="group_name"><b>Group Name: </b></label>
                  <input type="text" name="name" onChange={this.onChangeGroupName.bind(this)} required/><br/><br/>
                  <label htmlFor="group_pin"><b>Group Pin: </b></label>
                  <input type="text" name="group_pin" onChange={this.onChangeGroupPin.bind(this)} required/><br/><br/>
                  <label htmlFor="start_date"><b>Start Date: </b></label>
                  <input type="date" name="start_date" onChange={this.onChangeStartDate.bind(this)} required/><br/><br/>
                  <label htmlFor="end_date"><b>End Date: </b></label>
                  <input type="date" name="end_date" onChange={this.onChangeEndDate.bind(this)} required/><br/><br/>
                  <label htmlFor="group_Logo logo_add"><b>Group Logo: </b></label>
                  <input type="file" name="group_Logo" ref={this.setRef} onChange={this.onChangeRef.bind(this)}/><br/><br/>
                  <button type="button" className="Submit_Button" onClick={()=>this.addGroup()}>Add Group</button>
               </form>
         </div>
         </div>
      );
   }
}
const mapStateToProps = state => ({
    groups: state.groupState.groups,
    groupAdding: state.groupState.groupAdding,
    logoAdding: state.groupState.logoAdding
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {addGroup, groupAdded}
   ),withAuthorization(condition)
)(Add_Group);