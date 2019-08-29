import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {deleteNotification} from '../../../Action/notificationAction';
import withAuthorization from '../../Session/withAuthorization';
import { Link} from 'react-router-dom'
class NotificationRow extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            groupName: "",
            groupPin: this.props.groupPin,
            selected : {}
        }
    }
    componentDidMount(){
        // let pin = this.state.groupPin
        // let group=Object.assign([{}])
        // group= this.props.groups.filter(function(group){
        //     return (group.pin== pin)
        // })
        // let temp=Object.assign({},group[0])
        // this.setState({groupName: temp.name})
    }
    componentDidUpdate(){
        // if(this.props.selectAlarmChanged){
        //     this.props.selectAlarmChanging()
        //     this.props.history.push('/alarm/'+this.props.id);        
        // } 
    }
    handleDelete(id){
        alert("User with id:"+this.props.id+" has been deleted from the database");
        this.props.deleteNotification(id);
    }
    render(){
        return(
            <tr>
                <td><center>{this.props.groupName}</center></td>
                <td><center>{this.props.userType}{": "}{this.props.firstName}{" "}{this.props.lastName}</center></td>
                <td><center>{this.props.notification}</center></td>
                <td><center>{this.props.notificationTimeStamp}</center></td>                
                <td><center>
                    <button className="delete_button" id={this.props.id} onClick={()=>this.handleDelete(this.props.id)}>Delete</button></center>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.groupState.groups,
    selectedAlarm: state.alarmState.selectedAlarm,
    selectAlarmChanged: state.alarmState.selectAlarmChanged
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {deleteNotification}
    ),withAuthorization(condition)
)(NotificationRow);