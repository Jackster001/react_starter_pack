import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {deleteAlarm, selectAlarm, selectAlarmChanging} from '../../../Action/alarmAction';
import withAuthorization from '../../Session/withAuthorization';
import { Link} from 'react-router-dom'
class AlarmRow extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            groupName: "",
            groupPin: this.props.groupPin,
            selected : {}
        }
    }
    componentDidMount(){
        let pin = this.state.groupPin
        let group=Object.assign([{}])
        group= this.props.groups.filter(function(group){
            return (group.pin== pin)
        })
        let temp=Object.assign({},group[0])
        this.setState({groupName: temp.name})
    }
    componentDidUpdate(){
        if(this.props.selectAlarmChanged){
            this.props.selectAlarmChanging()
            this.props.history.push('/alarm/'+this.props.id);        
        } 
    }
    handleDelete(id){
        alert("User with id:"+this.props.id+" has been deleted from the database");
        this.props.deleteAlarm(id);
    }
    selected(id){
        this.props.selectAlarm(id);
    }
    render(){
        return(
            <tr>
                <td><center>{this.state.groupName}</center></td>
                <td><center>{this.props.groupPin}</center></td>
                <td><center>{this.props.title}</center></td>
                <td><center>{this.props.alarmTimestamp}</center></td>                
                <td><center>
                    <button className="edit_button" onClick={()=> this.selected(this.props.id)}>Edit</button><br/>
                    <button className="delete_button" id={this.props.id} onClick={() => { if (window.confirm('Are you sure you wish to delete this Alarm?')) this.handleDelete(this.props.id)}}>Delete</button></center>
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
      {deleteAlarm, selectAlarm, selectAlarmChanging}
    ),withAuthorization(condition)
)(AlarmRow);