import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {editGroup, groupChanged} from '../../../Action/groupAction'
import * as ROUTES from '../../../constants/routes';
class Group_Edit extends React.Component {
   constructor(props){
      super(props);
      this.state={
         selectedGroup: this.props.selectedGroup,
         id: this.props.selectedGroup.id,
         Group_Name: this.props.selectedGroup.name,
         Group_Pin: this.props.selectedGroup.pin,
         Group_Information: this.props.selectedGroup.Group_Information
         }
      }
   componentDidUpdate(){
      if(this.props.groupChanging){
            this.props.groupChanged()
            this.props.history.push('/groups');
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
   onHandleEdit(){
      let newGroup= {...this.state.selectedGroup,
         id: this.state.id,
         name: this.state.Group_Name,
         pin: this.state.Group_Pin,
         Group_Information: this.state.Group_Information
      }
      this.props.editGroup(newGroup);
   }
   render() {
      return (
         <div>
            <br/><br/><br/><br/>
            <div>
               <center><h1>Edit Group</h1></center>
            </div>
            <div className="add_Table_Styles">
               <form className="add_form">
                  <center><h2>Group Information</h2></center>
                  <label htmlFor="group_name"><b>Group Name: </b></label>
                  <input type="text" name="name" placeholder={this.props.selectedGroup.name} onChange={this.onChangeGroupName.bind(this)} required/><br/><br/>
                  <label htmlFor="group_pin"><b>Group Pin: </b></label>
                  <input type="text" name="group_pin" placeholder={this.props.selectedGroup.pin} onChange={this.onChangeGroupPin.bind(this)} required/><br/><br/>
                  <div className="groupTextField"><label htmlFor="group_info"><b>Group Description: </b></label>
                  <textarea rows="4" cols="28" name="group_info" placeholder={this.props.selectedGroup.Group_Information} onChange={this.onChangeGroupInformation.bind(this)}></textarea></div><br/><br/>
                  <button type="button" className="Submit_Button" onClick={()=>this.onHandleEdit()}>Complete Edit</button>
               </form>
            </div>
         </div>
      );
   }
}
const mapStateToProps = state => ({
   groups: state.groupState.users,
   selectedGroup: state.groupState.selectedGroup,
   groupChanging: state.groupState.groupChanging
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {editGroup, groupChanged}
   ),withAuthorization(condition)
)(Group_Edit);

