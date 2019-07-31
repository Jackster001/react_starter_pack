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
           <table class="table1 table-dark" border="1" cellspacing="0">
             <thead>
               <th>Id</th>
               <th>Group Type</th>
               <th>Group Name</th>
               <th>Details</th>
               <th>Profile Picture</th>
               <th>Tour Guide</th>
               <th>Chaperone</th>
               <th>Edit</th>
             </thead>
             <tbody>
              {this.props.users.map(function(user){
                return(<UserRow 
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
 
 const mapDispatchToProps = dispatch => ({
   onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
 });
 
 export default compose(
   connect(
     mapStateToProps,
     {getUsers}
   ),
 )(UserTable);