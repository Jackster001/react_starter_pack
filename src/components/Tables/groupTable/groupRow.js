import React from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {} from '../../Action'
import { withAuthorization } from '../Session';
import { Link} from 'react-router-dom'
class groupRow extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={selected : {}, done: false}
    
    }
    // componentDidUpdate(){
    //     if(this.props.changed){
    //         this.props.resetChanged()
    //         console.log(this.props.changed);

    //         this.props.history.push('/student/'+this.props.id);
    //     }
        
    // }
    handleDelete(id){
        alert("User with id:"+this.props.id+" has been deleted from the database");
        this.props.deleteUser(id);
    }
    selected(id){
        this.props.getSingleUser(id);
        console.log("select was called");
    }

    
    render(){
        return(
            <tr>
                {/* <td><input className="checkbox" type="checkbox" value="Car" onClick={()=>this.selected(this.props.id)}/></td> */}
                <td><center>{this.props.id}</center></td>
                <td><center>{this.props.Group_Type}</center></td>
                <td><center>{this.props.Group_Name}</center></td>
                <td>First Name: {this.props.firstName}<br/><br/>
                    Last Name: {this.props.lastName}<br/><br/>
                    Phone #: {this.props.phoneNumber}
                </td>
                {/* <td></td> */}
                <td>
                    <br/>
                    Name: {this.props.emergencyName}<br/><br/>
                    Phone #: {this.props.emergencyNumber}<br/><br/>
                    Relationship: {this.props.emergencyRelationship}<br/><br/>
                </td>
                <td><center><img src={this.props.profilePicture} height="120px" width="110px;"/></center></td>
                <td>{this.props.tourGuide}</td>
                <td>{this.props.leadChaperone}</td>
                <td><center>
                    {/* <Link to={'/student/'+this.props.id} >onClick={()=> this.selected(this.props.id)} */}
                        <button className="edit_button" onClick={()=> this.selected(this.props.id)}>Edit</button><br/>
                        {/* </Link> */}
                    <button className="delete_button" id={this.props.id} onClick={()=>this.handleDelete(this.props.id)}>Delete</button></center>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({
    users: state.userState.users,
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {}
    ),withAuthorization(condition)
)(UserRow);