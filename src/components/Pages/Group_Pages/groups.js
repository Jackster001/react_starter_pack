import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
import GroupTable from "../../Tables/groupTable/groupTable";
import * as ROUTES from '../../../constants/routes';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getGroups, gettingGroups} from '../../../Action/groupAction';
import {getUsers} from '../../../Action/userAction';
class Groups extends React.Component {
   constructor(props){
      super(props);
      this.state={
         deploy: false
      }
   }
   componentDidMount(){
      this.props.getGroups();
      this.props.getUsers();
   }
   componentDidUpdate(){
      if(this.props.groupRecieving){
         this.props.gettingGroups();
         this.setState({deploy: true})
      }
   }
   showGroupTable(){
      if(this.state.deploy){
         return <GroupTable/>
      }
   }
   render() {
      return (
         <div className="App">
         <div>
            <br/>
             <div className="userTable">
            <center>
               <h1>Group Management</h1>
               <Link to={ROUTES.GROUP_ADD}><button className="addNew">Add New Group</button></Link>
               </center><br/><br/>
               {this.showGroupTable()}
            </div>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
const mapStateToProps = state => ({
   groups: state.groupState.groups,
   groupRecieving: state.groupState.groupRecieving,
   users: state.userState.users
});
  
export default compose(
   connect(
      mapStateToProps,
      {getGroups, getUsers, gettingGroups}
   ),withAuthorization(condition)
 )(Groups);