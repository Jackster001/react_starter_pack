import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
import 'firebase/firestore';
import { compose } from 'recompose';
import 'firebase/auth';
import UserTable from "../../Tables/userTable/userTable";
import {getUsers} from '../../../Action';
import {getGroups} from '../../../Action/groupAction';
import {connect} from "react-redux";
import { Link} from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import {CSVLink } from 'react-csv';
class Users extends React.Component {
   constructor(props) {
      super(props);
      this.state= {data:this.props.users};
   };
   componentDidMount(){
      this.props.getUsers()
      this.props.getGroups();
   }
   render() {
      return (
         <div className="App">
            <div className="userPage">
               <br/>
               <div className="userTable">
                  <center><h1>User Management</h1></center>
                  <div>
                  <Link to={ROUTES.USER_ADD}><button className="addNew">Add New User</button></Link>
                  <CSVLink data={this.state.data} ><button className="downloadCSV">Download CSV</button></CSVLink>
                  </div><br/><br/>
                  <UserTable/>
               </div>
            </div>
         </div>
      );
   }
}
const condition = authUser => !!authUser;
const mapStateToProps = state => ({
   users: state.userState.users,
   groups: state.groupState.groups
 });
export default compose(
   withAuthorization(condition), 
   connect(mapStateToProps, 
   {getUsers, getGroups})
)(Users);

