import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getUsers, getSingleUser, deleteUser, resetChanged, finishedDeletingUser} from '../../../Action'
import { withAuthorization } from '../../Session';
import { Link} from 'react-router-dom'
class UserRow extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={selected : {}}
    }
    componentDidUpdate(){
        if(this.props.changed){
            this.props.resetChanged();
            this.props.history.push('/user/'+this.props.id);
        }
        if(this.props.userDeleting){
            this.props.finishedDeletingUser();
            window.location.reload();
        }
    }
    handleDelete(id){
        alert("User with id:"+this.props.id+" has been deleted from the database");
        this.props.deleteUser(id);
    }
    selected(id){
        this.props.getSingleUser(id);
    }
    render(){
        return(
            <tr>
                <td><center>{this.props.Group_Type}</center></td>
                <td><center>{this.props.Group_Name}</center></td>
                <td>First Name: {this.props.firstName}<br/><br/>
                    Last Name: {this.props.lastName}<br/><br/>
                    Phone #: {this.props.phoneNumber}
                </td>
                <td>
                    <br/>
                    Name: {this.props.emergencyName}<br/><br/>
                    Phone #: {this.props.emergencyNumber}<br/><br/>
                    Relationship: {this.props.emergencyRelationship}<br/><br/>
                </td>
                <td><center><img src={this.props.profilePicture} height="120px" width="110px;"/></center></td>
                <td>{this.props.tourGuideFirstName}{" "}{this.props.tourGuideLastName}</td>
                <td>{this.props.leadChaperoneFirstName}{" "}{this.props.leadChaperoneLastName}</td>
                <td><center>
                    <button className="edit_button" onClick={()=> this.selected(this.props.id)}>Edit</button><br/>
                    <button className="delete_button" id={this.props.id} onClick={() => { if (window.confirm('Are you sure you wish to delete this User Account?')) this.handleDelete(this.props.id)}}>Delete</button></center>
                </td>
            </tr>
        )
    }
}
const mapStateToProps = state => ({
    users: state.userState.users,
    selected: state.userState.selected,
    changed: state.userState.changed,
    userDeleting: state.userState. userDeleting
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {getUsers, getSingleUser, deleteUser, resetChanged, finishedDeletingUser}
    ),withAuthorization(condition)
)(UserRow);