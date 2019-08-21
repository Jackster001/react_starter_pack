import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {deleteAlarm, selectAlarm, selectAlarmChanging} from '../../../Action/alarmAction';
import {getGroups} from '../../../Action/groupAction'
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
    // componentDidUpdate(){
    //     if(this.props.selectGroupChanged){
    //         this.props.selectGroupChanging()
    //         // console.log(this.props.selectedGroup);
    //         this.props.history.push('/group/'+this.props.id);        
    //     } 
    // }
    handleDelete(id){
        // alert("User with id:"+this.props.id+" has been deleted from the database");
        // this.props.deleteGroup(id);
    }
    selected(id){
        // this.props.selectGroup(id);
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
      {deleteAlarm, selectAlarm, selectAlarmChanging, getGroups}
    ),withAuthorization(condition)
)(AlarmRow);