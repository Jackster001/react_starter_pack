import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import GroupRow from "./groupRow"
import {getGroups} from '../../../Action/groupAction'
class GroupTable extends React.Component {

  componentDidMount(){
    this.props.getGroups();
  }
   render() {
      return (
         <div className="basicTable">
           <table className="table1 table-dark" border="1" cellSpacing="0">
             <thead className="TableHead">
               <tr>
                <th>Group</th>
                <th>Logo</th>
                <th>Assigned</th>
                <th>Edit</th>
               </tr>
             </thead>
             <tbody>
              {this.props.groups.map(function(group, i){
                let subgroup= Object.assign({}, group.subGroup[i])
                let tourguide = Object.assign([{}], subgroup.tourGuide)
                console.log(tourguide)
                return(<GroupRow key={i}
                  id={group.id} 
                  groupName={group.name}
                  groupPin={group.pin}
                  groupLogo={group.groupLogo}
                  tourguide={tourguide}
                  />)
                })}
              </tbody>
            </table>
         </div>
      );
   }
}
const mapStateToProps = state => ({
  groups: state.groupState.groups
});
 
export default compose(
   connect(
     mapStateToProps,
     {getGroups}
   ),
)(GroupTable);