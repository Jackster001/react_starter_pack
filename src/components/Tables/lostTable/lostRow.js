import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getLostNotifications, deleteLostNotifications} from '../../../Action/lostAction';
import withAuthorization from '../../Session/withAuthorization';

class LostRow extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            // groupName: "",
            // groupPin: this.props.groupPin,
            // selected : {}
        }
    }
    handleDelete(id){
        alert("User with id:"+this.props.id+" has been deleted from the database");
        this.props.deleteLostNotifications(id);
    }
    render(){
        return(
            <tr>
                <td><center>{this.state.groupName}<br/>{this.props.groupPin}</center></td>
                <td>
                    Name: {this.props.firstName} {this.props.lastName} <br/>
                    Phone Number: {this.props.phoneNumber} <br/>
                    Tour Guide: {this.props.tourGuide} <br/>
                    Lead Chaperone: {this.props.leadChaperone}
                </td>
                <td>
                    Longitude: {this.props.locationLongitude} <br/>
                    Latitude: {this.props.locationLatitude} <br/>
                    Date & Time: {this.props.lostTimeStamp}
                </td>
                <td><center>
                    {this.props.emergencyContactName}
                </center></td>                
                <td><center>
                    <button className="delete_button" id={this.props.id} onClick={()=>this.handleDelete(this.props.id)}>Delete</button></center>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({
    lostNotifications: state.lostState.lostNotifications
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {getLostNotifications, deleteLostNotifications}
    ),withAuthorization(condition)
)(LostRow);