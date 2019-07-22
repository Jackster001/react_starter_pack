import React from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
class UserTable extends React.Component {
   render() {
      return (
         <div className="">
            <h1>{this.props.Group_Name}</h1>
         </div>
      );
   }
}
const mapStateToProps = state => ({
   users: Object.keys(state.userState.users || {}).map(key => ({
     ...state.userState.users[key],
     uid: key,
   })),
 });
 
 const mapDispatchToProps = dispatch => ({
   onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
 });
 
 export default compose(
   withFirebase,
   connect(
     mapStateToProps,
     mapDispatchToProps,
   ),
 )(UserTable);