import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import NotificationRow from "./notificationRow";
class NotificationTable extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="basicTable">
            <table className="table1 table-dark" border="1" cellSpacing="0">
                <thead className="TableHead">
                <tr>
                    <th>Group Name</th>
                    <th>Sender</th>
                    <th>Notification</th>
                    <th>Date & Time</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    { 
                        this.props.notifications.map(function(notification, i){
                            let date = new Date(notification.timestamp.seconds*1000);
                            let timestamp= date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: "2-digit"})  
                            return (
                                <NotificationRow
                                key={i}
                                id={notification.id}
                                groupName={notification.sender.groupName}
                                userType={notification.sender.userType}
                                firstName={notification.sender.firstName}
                                lastName={notification.sender.lastName}
                                notification={notification.message}
                                notificationTimeStamp={timestamp}
                                />
                            )
                        })
                    
                    }
                </tbody>
                </table>
            </div>
      );
   }
}
const mapStateToProps = state => ({
    notifications: state.notificationState.notifications
});
 
export default compose(
   connect(
     mapStateToProps,
     {}
   ),
)(NotificationTable);