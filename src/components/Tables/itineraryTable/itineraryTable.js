import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import ItineraryRow from "./itineraryRow"
class ItineraryTable extends React.Component {
    constructor(props){
        super(props)
        this.state={
            groupSelected:"",

        }
        
    }
    onChangeGroupName (event){
        return this.setState({...this.state, groupSelected: event.target.value})
    }
    render() {
      return (
         <div className="basicTable">
            <div className="filterBox">
                <select id="group_name" name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                <option disabled selected defaultValue>Group</option>
                    {this.props.groups.map(function(group){
                        return (<option value={group.name}>{group.name}</option>)
                })}
                </select>
            </div>
            <br/><br/>
            <table className="table1 table-dark" border="1" cellSpacing="0">
             <thead className="TableHead">
               <tr>
                <th>Group</th>
                <th>Date</th>
                <th>Schedule</th>
                <th>Edit</th>
               </tr>
             </thead>
            <tbody>
              {/* {
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
                })} */}
              </tbody>
            </table>
         </div>
      );
   }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  groups: state.groupState.groups,
//   users: state.userState.users
});
 
export default compose(
   connect(
     mapStateToProps,
     {}
   ),withAuthorization(condition)
)(ItineraryTable);