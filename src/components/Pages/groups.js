import React from 'react';
import '../components.css';
import DataTable from 'react-data-table-component';
import { withAuthorization } from '../Session';
const data = [{sn:"1", groupName:"ThanksGiving 2020", date:"Friday November 27th, 2020" }]
const columns = [
   {
      name: 'S.N.',
      selector: 'sn',
      sortable: true,
      left: true
   },
   {
      name: 'Group Name',
      selector: 'groupName',
      sortable: true,
      left: true,
   },
   {
      name: 'Date',
      selector: 'date',
      sortable: true,
      left: true,
   },
   {
      name:"Schedule",
      selector: "schedule",
      sortable: true,
      left: true
   }
];
const handleChange = (state) => {
   // You can use setState or dispatch with something like Redux so we can use the retrieved data
   console.log('Selected Rows: ', state.selectedRows);
 };

class Groups extends React.Component {

   render() {
      return (
         <div className="App">
         <div>
             <div className="userTable">
            <center><h1>Group Management</h1></center>
            <br/><br/>
            <DataTable style={{'overflowX': 'hidden'}}
               columns={columns}
               data={data}
               selectableRows // add for checkbox selection
               selectableRowsComponentProps={{ inkDisabled: true }}
               onTableUpdate={handleChange} />
            </div>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Groups)