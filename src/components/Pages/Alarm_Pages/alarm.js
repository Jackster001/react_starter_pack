import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
import AlarmTable from "../../Tables/alarmTable/alarmTable";
import * as ROUTES from '../../../constants/routes';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getGroups} from '../../../Action/groupAction'
import {getAlarms, gettingAlarms} from '../../../Action/alarmAction'
class Alarm extends React.Component {
   constructor(props){
      super(props);
      this.state={
         deploy: false
      }
   }
   componentDidMount(){
      this.props.getAlarms();
      this.props.getGroups();
   }
   componentDidMount(){
      if(this.props.gettingAlarms){
         this.props.gettingAlarms();
         this.setState({...this.state, deploy: true})
      }
   }
   showAlarmTable(){
      if(this.state.deploy){
         return <AlarmTable/>
      }
   }
   render() {
      return (
      <div className="App">
         <div><br/>
            <center>
               <h1>Alarm Management</h1>
               <Link to={ROUTES.ALARM_ADD}><button className="addNew">Add Alarm</button></Link>
            </center><br/><br/>
            {this.showAlarmTable()}
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
const mapStateToProps = state => ({
   groups: state.groupState.groups,
   gettingAlarms: state.alarmState.gettingAlarms
});
export default compose(
   connect(
      mapStateToProps,
     {getGroups, getAlarms, gettingAlarms}
   ),withAuthorization(condition)
)(Alarm);