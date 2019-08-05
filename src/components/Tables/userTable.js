import React from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import UserRow from "./userRow"
import {getUsers} from '../../Action'
class UserTable extends React.Component {
  componentDidMount(){
    this.props.getUsers()
  }
   render() {
      return (
         <div className="basicTable">
           <table className="table1 table-dark" border="1" cellSpacing="0">
             <thead>
               <tr>
                <th>Id</th>
                <th>Group Type</th>
                <th>Group Name</th>
                <th>Details</th>
                <th>Profile Picture</th>
                <th>Tour Guide</th>
                <th>Chaperone</th>
                <th>Edit</th>
               </tr>
             </thead>
             <tbody>
              {this.props.users.map(function(user, i){
                return(<UserRow key={i}
                  id={user.id} 
                  Group_Type={user.Group_Type}
                  Group_Name={user.Group_Name}
                  Details={user.Details}
                  profilePicture={user.profilePicture}
                  Tour_Guide={user.Tour_Guide}
                  Chaperone={user.Chaperone}
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