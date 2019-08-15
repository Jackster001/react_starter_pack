import React from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import GroupRow from "./groupRow"
import {getUsers, userAddedChanged} from '../../Action'
class groupTable extends React.Component {
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
              {console.log(this.props.users)}
              { this.props.groups.map(function(group, i){
                let subGroups =Object.assign({}, group.subGroups)
                let tourGuides = [];
                let leadChaperones= [];
                subGroups.map(function(subGroupNumber){
                    tourGuides.push(subGroupNumber.tourGuide.firstName)
                    leadChaperones.push(subGroupNumber.leadChaperone.firstName)
                });
                return(<GroupRow key={i}
                  id={group.id} 
                  groupName={group.name}
                  groupPin={group.pin}
                  lastName={user.lastName}
                  tourGuide={[tourGuides]}
                  />)
                })}
              </tbody>
            </table>
         </div>
      );
   }
}
const mapStateToProps = state => ({
  groups: state.userState.groups
});
 
export default compose(
   connect(
     mapStateToProps,
     {getUsers, userAddedChanged}
   ),
)(groupTable);