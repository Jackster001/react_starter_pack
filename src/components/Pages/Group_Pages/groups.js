import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
import GroupTable from "../../Tables/groupTable/groupTable";
import * as ROUTES from '../../../constants/routes';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getGroups} from '../../../Action/groupAction';
import {getUsers} from '../../../Action/userAction';
class Groups extends React.Component {
   componentDidMount(){
      this.props.getGroups();
      this.props.getUsers();
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
               <GroupTable/>
            </div>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
const mapStateToProps = state => ({
   groups: state.groupState.groups,
   users: state.userState.users
 });
  
export default compose(
   connect(
      mapStateToProps,
      {getGroups, getUsers}
   ),withAuthorization(condition)
 )(Groups);