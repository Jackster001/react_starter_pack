import React from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {deleteUser} from '../../Action'
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link, BrowserRouter as Router } from 'react-router-dom'
class UserRow extends React.Component{
    constructor(props){
        super(props);
    }
    handleDelete(id){
        alert("User with id:"+this.props.id+" has been deleted from the database");
        this.props.deleteUser(id);
        window.location.reload();
    }
    render(){
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.Group_Type}</td>
                <td>{this.props.Group_Name}</td>
                <td>Name: {this.props.Details}</td>
                <td><img src='{this.props.profilePicture}' height="100px" width="100px;"/></td>
                <td>{this.props.Tour_Guide}</td>
                <td>{this.props.Chaperone}</td>
                <td><center>
                    <Link to={'/student/'+this.props.id} params={this.props.id}><button className="edit_button" id={this.props.id} >Edit</button><br/></Link>
                    <button className="delete_button" id={this.props.id} onClick={()=>this.handleDelete(this.props.id)}>Delete</button></center>
                </td>
            </tr>
        )
    }
}
// export default UserRow;

const mapStateToProps = state => ({
    users: state.userState.users,
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {deleteUser}
    ),withAuthorization(condition)
)(UserRow);