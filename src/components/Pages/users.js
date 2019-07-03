import React from 'react';
import '../components.css';
import Navigation from '../navigation'
import DataTable from 'react-data-table-component';
import profile from "../images/profile.jpg"
const data = [{ sn: 1, type: 'Student', groupName: 'Thanksgiving2020', detail:"N/A", profilePicture: <img src={profile} width="100px" height="100px"/>, tourGuide:"Bus1" , chap:"Bus2"},
              { sn: 2, type: 'Student', groupName: 'Thanksgiving2020', detail:"N/A", profilePicture: <img src={profile} width="100px" height="100px"/>, tourGuide:"Bus4" , chap:"Bus1"}
]
const columns = [
   
   {
      name: 'S.N.',
      selector: 'sn',
      sortable: true,
      left: true
   },
   {
      name: 'Group Type',
      selector: 'type',
      sortable: true,
      left: true,
   },
   {
      name: 'Group Name',
      selector: 'groupName',
      sortable: true,
      left: true,
   },
   {
      name: 'Detail',
      selector: 'detail',
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
      name: 'Group Tour Guide',
      selector: 'tourGuide',
      sortable: true,
      left: true,
   },
   {
      name: 'Selected Chaperone',
      selector: 'chap',
      sortable: true,
      left: true,
   }
];
const handleChange = (state) => {
   // You can use setState or dispatch with something like Redux so we can use the retrieved data
   console.log('Selected Rows: ', state.selectedRows);
 };
class Users extends React.Component {

   render() {
      return (
         <div className="userPage">
            <Navigation/>
            <div className="userTable">
               <center><h1>User Management</h1></center>
               <br/><br/>
               <DataTable style={{'overflowX': 'hidden'}}
               title="Users"
               columns={columns}
               data={data}
               selectableRows // add for checkbox selection
               selectableRowsComponentProps={{ inkDisabled: true }}
               onTableUpdate={handleChange} 
               />
            </div>
         </div>
      );
   }
}
export default Users