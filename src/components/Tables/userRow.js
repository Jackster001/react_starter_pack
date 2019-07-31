import React from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {fb} from '../Firebase/firebase'
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
                <td>Name: {this.props.Details}</td>
                {/* <td>{fb               
                    .images(this.props.id)                
                    .child(`${test.image.substring(12)}`)
                    .getDownloadURL()                        
                    .then((url) => {           
                    return <img src='{url}' height="200px" width="200px;"/>
                    })}</td> */}
                <td><img src='{this.props.profilePicture}' height="100px" width="100px;"/></td>
                <td>{this.props.Tour_Guide}</td>
                <td>{this.props.Chaperone}</td>
                <td><button id={this.props.id}>Edit</button></td>
            </tr>
        )
    }
}
export default UserRow;