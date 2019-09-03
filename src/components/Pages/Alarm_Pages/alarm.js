import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
import AlarmTable from "../../Tables/alarmTable/alarmTable";
import * as ROUTES from '../../../constants/routes';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getGroups} from '../../../Action/groupAction'
import {getAlarms} from '../../../Action/alarmAction'
class Alarm extends React.Component {
   componentDidMount(){
      this.props.getAlarms();
      this.props.getGroups();
   }
   render() {
      return (
      <div className="App">
         <div>
            <center>
               <h1>Alarm Management</h1>
               <Link to={ROUTES.ALARM_ADD}><button className="addNew">Add Alarm</button></Link>
            </center><br/><br/>
            <AlarmTable/>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
const mapStateToProps = state => ({
   groups: state.groupState.groups
});
export default compose(
   connect(
      mapStateToProps,
     {getGroups, getAlarms}
   ),withAuthorization(condition)
)(Alarm);