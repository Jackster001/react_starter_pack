import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import GroupRow from "./groupRow"
import {getGroups} from '../../../Action/groupAction'
import {getUsers} from '../../../Action/userAction'
class GroupTable extends React.Component {
   render() {
      return (
         <div className="basicTable">
           <table className="table1 table-dark" border="1" cellSpacing="0">
             <thead className="TableHead">
               <tr>
                <th>Group</th>
                <th>Logo</th>
                <th>Assigned Tour Guides</th>
                <th>Assigned Lead Chaperones</th>
                <th>Edit</th>
               </tr>
             </thead>
            <tbody>
              {
                this.props.groups.map((group, i)=>{
                let subgroup= Object.assign([], group.subGroups)
                let avaliableTourGuides= this.props.users.filter((user)=>{
                  return (user.userType === "Tour Guide" && user.groupPin === group.pin)
                })
                let avaliableLeadChaperones = this.props.users.filter((user)=>{
                  return (user.userType === "Lead Chaperone" && user.groupPin === group.pin)
                })
                return(<GroupRow key={i}
                  id={group.id} 
                  groupName={group.name}
                  groupPin={group.pin}
                  groupLogo={group.groupLogo}
                  subgroup={subgroup}
                  avaliableTourGuides={avaliableTourGuides}
                  avaliableLeadChaperones={avaliableLeadChaperones}
                  />)
                })}
              </tbody>
            </table>
         </div>
      );
   }
}
const mapStateToProps = state => ({
  groups: state.groupState.groups,
  users: state.userState.users
});
 
export default compose(
   connect(
     mapStateToProps,
     {getGroups, getUsers}
   ),
)(GroupTable);