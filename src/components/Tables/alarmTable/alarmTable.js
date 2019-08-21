import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AlarmRow from "./alarmRow"
class AlarmTable extends React.Component {
    render() {
        return (
            <div className="basicTable">
            <table className="table1 table-dark" border="1" cellSpacing="0">
                <thead className="UserTableHead">
                <tr>
                    <th>Group Name</th>
                    <th>Group Pin</th>
                    <th>Alarm Message</th>
                    <th>Date & Time</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                { 
                    this.props.alarms.map(function(alarm, i){  
                    let temp = alarm.timestamp;
                    // console.log(temp)
                    // console.log(alarm.timestamp)          
                        return(
                        <AlarmRow key={i}
                        id={alarm.id} 
                        groupName={alarm.name}
                        groupPin={alarm.groupPin}
                        title={alarm.title}
                        // alarmTimestamp={}
                        />)
                        })}
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
)(AlarmTable);