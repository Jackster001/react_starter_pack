import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import LostRow from "./lostRow"
class LostTable extends React.Component {
    constructor(props){
        super(props)
        this.state={
            lostNotifications: this.props.lostNotifications
        }
    }
    render() {
        return (
            <div className="basicTable">
            <table className="table1 table-dark" border="1" cellSpacing="0">
                <thead className="TableHead">
                <tr>
                    <th>Group</th>
                    <th>Profile Picture</th>
                    <th>User Information</th>
                    <th>Location, Date & Time</th>
                    <th>Emergency Contact</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                { 
                    this.state.lostNotifications.map((lostNotification, i)=>{  
                    console.log(lostNotification)
                    let emergencyContact= Object.assign({}, lostNotification.user.emergencyContact)
                    let timeObject = Object.assign({},lostNotification.timestamp);
                    let date= new Date(timeObject.seconds*1000)
                    let timestamp= date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: "2-digit"})          
                        return(
                        <LostRow key={i}
                            id={lostNotification.id} 
                            groupPin={lostNotification.groupPin}
                            groupName={lostNotification.user.groupName}
                            firstName={lostNotification.user.firstName}
                            lastName={lostNotification.user.lastName}
                            phoneNumber={lostNotification.user.phoneNumber}
                            locationLatitude= {lostNotification.location.latitude}
                            locationLongitude= {lostNotification.location.longitude}
                            lostTimestamp={timestamp}
                            tourGuide={lostNotification.user.tourGuide.firstName}
                            leadChaperone={lostNotification.user.leadChaperone.firstName}
                            profilePicture={lostNotification.user.profilePicture}
                            emergencyContactName={emergencyContact.name}
                            relationship={emergencyContact.relationship}
                            emergencyContactNumber={emergencyContact.number}
                        />)
                })}
                </tbody>
                </table>
            </div>
      );
   }
}
const mapStateToProps = state => ({
    lostNotifications: state.lostState.lostNotifications
});
export default compose(
   connect(
     mapStateToProps,
     {}
   ),
)(LostTable);