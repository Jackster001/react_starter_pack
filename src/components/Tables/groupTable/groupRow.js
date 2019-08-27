import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {deleteGroup, selectGroup, selectGroupChanging} from '../../../Action/groupAction'
import withAuthorization from '../../Session/withAuthorization';
import { Link} from 'react-router-dom'

class GroupRow extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={selected : {}}
    }
    componentDidUpdate(){
        if(this.props.selectGroupChanged){
            this.props.selectGroupChanging()
            this.props.history.push('/group/'+this.props.id);        
        } 
    }
    handleDelete(id){
        alert("User with id:"+this.props.id+" has been deleted from the database");
        this.props.deleteGroup(id);
    }
    selected(id){
        this.props.selectGroup(id);
    }
    render(){
        return(
            <tr>
                <td><center>{this.props.groupName}</center></td>
                <td><center>{this.props.groupPin}</center></td>
                {/* <td>
                    <center>
                        {this.props.TourGuides.map(function(tourGuide){
                            return <p>{tourGuide.firstName}</p>
                        })}<br/><br/>
                    </center>
                </td>
                <td>
                    <center>
                        {this.props.LeadChaperones.map(function(leadChaperone){
                            return <p>{leadChaperone.firstName}</p>
                        })}<br/><br/>
                    </center>
                </td> */}
                {/* <td><center><button className="assignButton" onClick={()=>this.showModal()}>Assign</button>
                <GroupModal show={this.state.show} handleClose={()=>this.hideModal()}>
                    <div className="modalContent">
                        <center><h2>Assign Team Members to Group</h2></center>
                        <br/>
                        <h4>Select type of team member to </h4>
                    </div>
                </GroupModal>
                </center></td> */}
                <td><center><img className="Group_Logo_Table" src={this.props.groupLogo} /></center></td>
                <td><center>
                    <button className="edit_button" onClick={()=> this.selected(this.props.id)}>Edit</button><br/>
                    <button className="delete_button" id={this.props.id} onClick={()=>this.handleDelete(this.props.id)}>Delete</button></center>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.groupState.groups,
    selectedGroup: state.groupState.selectedGroup,
    selectGroupChanged: state.groupState.selectGroupChanged
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {deleteGroup, selectGroup, selectGroupChanging}
    ),withAuthorization(condition)
)(GroupRow);