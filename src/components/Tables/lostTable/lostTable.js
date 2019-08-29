import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AlarmRow from "./alarmRow"
class LostTable extends React.Component {
    render() {
        return (
            <div className="basicTable">
            <table className="table1 table-dark" border="1" cellSpacing="0">
                <thead className="TableHead">
                <tr>
                    <th>Group Pin</th>
                    <th>Group Name</th>
                    <th>User Information</th>
                    <th>Emergency Contact</th>
                    <th>Location, Date & Time</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {/* { 
                    this.props.alarms.map(function(alarm, i){  
                    let timeObject = Object.assign({},alarm.timestamp);
                    let date= new Date(timeObject.seconds*1000)
                    let timestamp= date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: "2-digit"})          
                        return(
                        <AlarmRow key={i}
                        id={alarm.id} 
                        groupName={alarm.name}
                        groupPin={alarm.groupPin}
                        title={alarm.title}
                        alarmTimestamp={timestamp}
                        />)
                        })} */}
                </tbody>
                </table>
            </div>
      );
   }
}
const mapStateToProps = state => ({
    alarms: state.alarmState.alarms
});
 
export default compose(
   connect(
     mapStateToProps,
     {}
   ),
)(LostTable);