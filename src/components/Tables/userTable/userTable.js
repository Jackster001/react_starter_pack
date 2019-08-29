import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import UserRow from "./userRow"
import {userAddedChanged} from '../../../Action'
class UserTable extends React.Component {
   render() {
      return (
         <div className="basicTable">
           <table className="table1 table-dark" border="1" cellSpacing="0">
             <thead className="TableHead">
               <tr>
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
                let tourGuide =Object.assign({}, user.tourGuide)
                let leadChaperone= Object.assign({}, user.leadChaperone)
                return(<UserRow key={i}
                  id={user.id} 
                  Group_Type={user.userType}
                  Group_Name={user.GroupName}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  emergencyName={data.name}
                  emergencyNumber={data.phoneNumber}
                  emergencyRelationship={data.relationship}
                  tourGuide={tourGuide.firstName}
                  leadChaperone={leadChaperone.firstName}
                  phoneNumber={user.phoneNumber}
                  profilePicture={user.profilePicture}
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
  userAdded: state.userState.userAdded
});
 
export default compose(
   connect(
     mapStateToProps,
     {userAddedChanged}
   ),
)(UserTable);