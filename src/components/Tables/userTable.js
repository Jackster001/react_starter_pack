import React from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import UserRow from "./userRow"
import {getUsers} from '../../Action'
class UserTable extends React.Component {
  componentDidMount(){
    this.props.getUsers();
    this.props.users.map(function(user, i){
      // let data= Object.assign({},user.emergencyContact)
      // console.log(data);
    })
  }
   render() {
      return (
         <div className="basicTable">
           <table className="table1 table-dark" border="1" cellSpacing="0">
             <thead className="UserTableHead">
               <tr>
                <th>Email Id</th>
                <th>User Type</th>
                <th>Group Name</th>
                <th>Details</th>
                <th>Emergency Contact</th>
                <th>Profile Picture</th>
                <th>Tour Guide</th>
                <th>Chaperone</th>
                <th>Edit</th>
               </tr>
             </thead>
             <tbody>
              { this.props.users.map(function(user, i){
                let data= Object.assign({},user.emergencyContact)
                console.log(user.profilePicture)
                return(<UserRow key={i}
                  id={user.id} 
                  Group_Type={user.userType}
                  Group_Name={user.groupPin}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  emergencyName={data.name}
                  emergencyNumber={data.phoneNumber}
                  emergencyRelationship={data.relationship}
                  phoneNumber={user.phoneNumber}
                  profilePicture={user.profilePicture}
                  // Tour_Guide={user.Tour_Guide}
                  // Chaperone={user.Chaperone}
                  // id={user.id} 
                  // Group_Type={user.Group_Type}
                  // Group_Name={user.Group_Name}
                  // Details={user.Details}
                  // phoneNumber={user.phoneNumber}
                  // profilePicture={user.profilePicture}
                  // Tour_Guide={user.Tour_Guide}
                  // Chaperone={user.Chaperone}
                  />)
                })}
              </tbody>
            </table>
         </div>
      );
   }
}
const mapStateToProps = state => ({
  users: state.userState.users,
});
 
export default compose(
   connect(
     mapStateToProps,
     {getUsers}
   ),
)(UserTable);