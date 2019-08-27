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
         groupLogo: this.props.selectedGroup.groupLogo,
         logoChanged: false
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
   onChangeRef(){
      const file = this.file.files[0];
      return(
      this.setState({Group_Logo: file, logoChanged: true}) 
      )
   }
   setRef = ref =>{
      this.file = ref
   }
   onHandleEdit(){
      let newGroup= {...this.state.selectedGroup,
         id: this.state.id,
         name: this.state.Group_Name,
         pin: this.state.Group_Pin,
         groupLogo: this.state.groupLogo
      }
      this.props.editGroup(newGroup, this.state.logoChanged);
   }
   render() {
      return (
         <div>
            <br/><br/><br/><br/>
            <div className="add_Table_Styles">
            <div className="editFormHeading"><h1>Group Management</h1></div>
            <img className="group_Logo_Edit" src={this.state.groupLogo}/>
               <form className="add_form">
                  <center><h2>Edit Group Information</h2></center><br/>
                  <label htmlFor="group_name"><b>Group Name: </b></label>
                  <input type="text" name="name" placeholder={this.props.selectedGroup.name} onChange={this.onChangeGroupName.bind(this)} required/><br/><br/>
                  <label htmlFor="group_pin"><b>Group Pin: </b></label>
                  <input type="text" name="group_pin" placeholder={this.props.selectedGroup.pin} onChange={this.onChangeGroupPin.bind(this)} required/><br/><br/>
                  <div className="groupLogo"><label htmlFor="group_Logo"><b>Group Logo: </b></label>
                  <input type="file" name="group_Logo" ref={this.setRef} onChange={this.onChangeRef.bind(this)}/></div>
                  <button type="button" className="update_Button" onClick={()=>this.onHandleEdit()}>Update Group</button>
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

