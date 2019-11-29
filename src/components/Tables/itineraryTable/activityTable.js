import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import ActivityRow from "./activityRow"
import { thisExpression } from '@babel/types';
class ActivityTable extends React.Component {
    constructor(props){
        super(props)
        this.state={
            activities: this.props.activities,
            id: this.props.id,
            index: this.props.index,
            length: this.props.length
        }
    }
    itineraryTable(){
      var list=[]
      for(let i=0; i<this.state.length;i++){
        let activity=this.state.activities[i]
        let timeObject = Object.assign({},activity.time);
        let date= new Date(timeObject.seconds*1000)
        let timestamp= date.toLocaleTimeString('en-US', {hour: '2-digit', minute: "2-digit"})
        list.push(<ActivityRow time={timestamp} activity={activity.description}/>)
      }
      return list
    }
    render() {
      return (
         <div className="schedule">
            <table className="scheduleTable table-dark" border="1" cellSpacing="0">
               <thead className="TableHead">
                  <tr>
                    <th className="scheduleTableTime">Time</th>
                    <th>Activity</th>
                  </tr>
               </thead>
            <tbody>
              {
                this.itineraryTable()
              }
            </tbody>
            </table>
         </div>
      );
   }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  groups: state.groupState.groups,
  itineraries: state.itineraryState.itineraries
});
 
export default compose(
   connect(
     mapStateToProps,
     {}
   ),withAuthorization(condition)
)(ActivityTable);