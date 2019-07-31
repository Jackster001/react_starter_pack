import React from 'react';
import '../components.css';
// import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import DataTable from 'react-data-table-component';
import profile from "../images/profile.jpg"
import 'firebase/firestore';
// import {withRouter} from 'react-router-dom'
import { compose } from 'recompose';
import db from "../Firebase/firebase"
import 'firebase/auth';
import UserTable from "../Tables/userTable"
import {getUsers} from '../../Action'
import {connect} from "react-redux"

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
const handleChange = (state) =>{
   console.log(state.selectedRows);
}
class Users extends React.Component {
   constructor(props) {
      super(props);
      this.state= {data:this.props.users, once: false};
      // this.Data=this.Data.bind(this); 
   };
   componentWillUpdate(){
      // this.props.getUsers()
   }
   
   render() {
      
      return (
         <div className="App">

         <div className="userPage">
            <br/>
            <div className="userTable">
               <center><h1>User Management</h1></center>
               <div>
                  <button>Add New</button>
               </div>
               <br/><br/>
               {/* <DataTable style={{'overflowX': 'hidden'}}
               columns={columns}
               data={this.props.users}
               selectableRows // add for checkbox selection
               onTableUpdate={handleChange} 
               /> */}
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

