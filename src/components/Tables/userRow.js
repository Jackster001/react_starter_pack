import React from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
class UserRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.Group_Type}</td>
                <td>{this.props.Group_Name}</td>
                <td>{this.props.Details}</td>
                <td>{this.props.profilePicture}</td>
                <td>{this.props.Tour_Guide}</td>
                <td>{this.props.Chaperone}</td>
                <td><button id={this.props.id}>Edit</button></td>
            </tr>
        )
    }
}
export default UserRow;