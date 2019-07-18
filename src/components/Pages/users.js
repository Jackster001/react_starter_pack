import React from 'react';
import '../components.css';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import DataTable from 'react-data-table-component';
import profile from "../images/profile.jpg"
import 'firebase/firestore';
import {withRouter} from 'react-router-dom'
import { compose } from 'recompose';
import db from "../Firebase/firebase"
import 'firebase/auth';

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
   // {
   //    name: 'Group Tour Guide',
   //    selector: 'tourGuide',
   //    sortable: true,
   //    left: true,
   // },
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
      left: true
   }
];
// const handleChange = (state) => {
//    // You can use setState or dispatch with something like Redux so we can use the retrieved data
//    console.log('Selected Rows: ', state.selectedRows);
//  };
var data1=[];
var stop= false;
class Users extends React.Component {
   constructor(props) {
      super(props);
      // this.state= {data:[{ id: "1", Group_Type: 'Student', Group_Name: 'Thanksgiving2020', Details:"N/A", Tour_Guide:"aega",Chaperone:"Bus2"},
      //         { id: "2", Group_Type: 'Student', Group_Name: 'Thanksgiving2020', Details:"N/A", Tour_Guide:"ntre",Chaperone:"Bus1"}], dataRecieved:false,};
      this.state= {data:[], dataRecieved:false};
      this.Data=this.Data.bind(this); 

   };
   componentDidMount(){
      this.setState(data1);
      console.log(data1)
   }
   componentDidUpdate(){
      // if(this.state.dataRecieved){
      //    this.setState({state:this.state});
      //    this.setState({dataRecieved: false})
      //    console.log(this.state)
      // }
      // console.log("component did update")
   }
   componentWillMount(){
      this.Data();     
   }
   // profilePicture:<img className="userPic" src="https://image.flaticon.com/icons/png/512/64/64572.png"
   Data(){
      data1=[{ id: "1", Group_Type: 'Student', Group_Name: 'Thanksgiving2020', Details:"N/A",profilePicture:<img className="userPic" src="https://image.flaticon.com/icons/png/512/64/64572.png" height="80px" width="80px"/>, Tour_Guide:"aega",Chaperone:"Bus2", Edit:<button className="editButton">Edit</button>}]
      var db=this.props.firebase.db.collection("Students");
      db.get().then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
         let users = doc.data();
         users= {id:doc.id,...users,profilePicture:"", Edit:<button className="editButton">Edit</button>}
         data1.push(users);
         console.log(users.profilePicture);
         })
      })
      .catch(function(error){
         console.log("Error getting document:", error);
      })
      console.log(data1);
      console.log("dataTransferred")
   }
   render() {
      console.log("called render")
      return (
         <div className="App">
         <div className="userPage">
            <br/>
            <div className="userTable">
               <center><h1 onClick={()=>this.refresh()}>User Management</h1></center>
               <DataTable style={{'overflowX': 'hidden'}}
               columns={columns}
               data={data1}
               // selectableRows // add for checkbox selection
               // onTableUpdate={handleChange} 
               />
            </div>
         </div>
      </div>
      );
   }

}
const condition = authUser => !!authUser;
// const UserTable = compose(withFirebase, withAuthorization(condition), withRouter)(UserTableBase);
export default withAuthorization(condition)(withFirebase(Users))
// export default withFirebase(Users);
// export default Users
// export {UserTable};
