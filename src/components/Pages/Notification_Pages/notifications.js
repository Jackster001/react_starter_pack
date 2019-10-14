import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
import {connect} from "react-redux";
import { compose } from 'recompose';
import {getNotifications,recievedNotifications} from '../../../Action/notificationAction';
import {getGroups} from '../../../Action/groupAction';
import NotificationTable from '../../Tables/notificationsTable/notificationTable';
import { Link} from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

class Notifications extends React.Component {
   constructor(props){
      super(props);
      this.state={
         deploy: false
      }
   }
   componentDidMount(){
      this.props.getNotifications();
      this.props.getGroups();
   }
   componentDidUpdate(){
      if(this.props.notificationsGetting){
         this.props.recievedNotifications()
         this.setState({...this.state, deploy: true})
      }
   }
   showNotificationTable(){
      if(this.state.deploy){
         return <NotificationTable/>
      }
   }
   render() {
      return (
         <div className="App">
            <div>
               <center><h1>Notifications</h1></center>
               <Link to={ROUTES.SEND_NOTIFICATION}><button className="addNew">Send Notification</button></Link><br/><br/>
               {this.showNotificationTable()}
            </div>
         </div>
      );
   }
}
const condition = authUser => !!authUser;
const mapStateToProps = state => ({
   notifications: state.notificationState.notifications,
   notificationsGetting: state.notificationState.notificationsGetting
 });
export default compose(
   withAuthorization(condition), 
   connect(mapStateToProps, 
   {getNotifications, getGroups, recievedNotifications})
)(Notifications);