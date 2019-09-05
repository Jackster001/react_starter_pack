import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getLostNotifications, deleteLostNotifications} from '../../../Action/lostAction';
import withAuthorization from '../../Session/withAuthorization';

class LostRow extends React.PureComponent{
    handleDelete(id){
        alert("User with id:"+this.props.id+" has been deleted from the database");
        this.props.deleteLostNotifications(id);
    }
    render(){
        return(
            <tr>
                <td><center>{this.props.groupName}<br/><br/>{this.props.groupPin}</center></td>
                <td><center><img src={this.props.profilePicture} height="120px" width="110px;"/></center></td>
                <td>
                    <p>Name: <span className="lostTableData">{this.props.firstName} {this.props.lastName} </span></p>
                    <p>Phone Number: <span className="lostTableData">{this.props.phoneNumber} </span></p>
                    <p>Tour Guide: <span className="lostTableData">{this.props.tourGuide}</span></p>
                    <p>Lead Chaperone: <span className="lostTableData">{this.props.leadChaperone}</span></p>
                </td>
                <td>
                <p>Latitude: <span className="lostTableData">{this.props.locationLatitude}</span></p>
                    <p>Longitude: <span className="lostTableData">{this.props.locationLongitude}</span></p>
                    <p>Date & Time: <span className="lostTableData">{this.props.lostTimestamp}</span></p>
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