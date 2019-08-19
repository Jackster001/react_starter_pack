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
             <thead className="UserTableHead">
               <tr>
                <th>Group Name</th>
                <th>Group Pin</th>
                <th>Tour Guide</th>
                <th>Lead Chaperone</th>
                <th>Assign</th>
                <th>Edit</th>
               </tr>
             </thead>
             <tbody>
              {this.props.groups.map(function(group, i){
                let tourGuides = [];
                let leadChaperones= [];
                if(group.subGroups){
                  let subGroups =Object.assign([], group.subGroups)
                  subGroups.map(function(subGroupNumber){
                    tourGuides=[...tourGuides,{
                      id: subGroupNumber.tourGuide.id,
                      firstName: subGroupNumber.tourGuide.firstName,
                      lastName: subGroupNumber.tourGuide.lastName
                    }]
                    leadChaperones=[...leadChaperones,{
                      id: subGroupNumber.leadChaperone.id,
                      firstName: subGroupNumber.leadChaperone.firstName,
                      lastName: subGroupNumber.leadChaperone.lastName}
                    ]
                });
                }
                
                return(<GroupRow key={i}
                  id={group.id} 
                  groupName={group.name}
                  groupPin={group.pin}
                  TourGuides={tourGuides}
                  LeadChaperones= {leadChaperones}
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