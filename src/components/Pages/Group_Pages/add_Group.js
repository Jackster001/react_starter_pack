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
            Group_Information: ""
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
   addGroup(){
        let newGroup= {
            GroupName: this.state.Group_Name,
            GroupPin: this.state.Group_Pin,
            GroupInfo: this.state.Group_Information
            // director: {
            //     id: "",
            //     name: ""
            // },
            // subGroups:{
            //     0:{
            //         chaperones
            //     }
            // }
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
                  <div className="groupTextField"><label htmlFor="group_info"><b>Group Description: </b></label>
                  <textarea className="addGroupTextArea" name="group_info" onChange={this.onChangeGroupInformation.bind(this)}></textarea></div><br/><br/>
                  <button type="button" className="Submit_Button" onClick={()=>this.addGroup()}>Add Group</button>
               </form>
         </div>
         </div>
      );
   }
}
const mapStateToProps = state => ({
    groups: state.groupState.groups,
    groupAdding: state.groupState.groupAdding
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {addGroup, groupAdded}
   ),withAuthorization(condition)
)(Add_Group);