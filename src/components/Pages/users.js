import React from 'react';
import '../components.css';
import { withAuthorization } from '../Session';
import 'firebase/firestore';
import { compose } from 'recompose';
import 'firebase/auth';
import UserTable from "../Tables/userTable"
import {getUsers} from '../../Action'
import {connect} from "react-redux"
import { Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {CSVLink } from 'react-csv';
const columns = [
   
   {
      name: 'id',
      selector: 'id',
      sortable: true,
      left: true
   },
   {
      name: 'Group Type',
      selector: 'Group_Type',
      sortable: true,
      left: true,
   },
   {
      name: 'Group Name',
      selector: 'Group_Name',
      sortable: true,
      left: true,
   },
   {
      name: 'Details',
      selector: 'Details',
      sortable: true,
      left: true,
   },
   {
      name: 'Profile Picture',
      selector: 'profilePicture',
      sortable: true,
      left: true,
   },
   {
      name: 'Tour Guide',
      selector: 'Tour_Guide',
      sortable: true,
      left: true,
   },
   {
      name: 'Selected Chaperone',
      selector: 'Chaperone',
      sortable: true,
      left: true,
   },
   {
      name:"Edit",
      selector:"Edit",
      left: true,
      cell: row => <div><button>Edit</button></div>
   }
];
class Users extends React.Component {
   constructor(props) {
      super(props);
      this.state= {data:this.props.users};
   };
   componentDidMount(){
   }
   render() {
      return (
         <div className="App">
            <div className="userPage">
               <br/>
               <div className="userTable">
                  <center><h1>User Management</h1></center>
                  <div>
                  <Link to={ROUTES.STUDENT_ADD}><button className="addNewUser">Add New User</button></Link>
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
 });
export default compose(withAuthorization(condition), connect(mapStateToProps, {getUsers}))(Users);

