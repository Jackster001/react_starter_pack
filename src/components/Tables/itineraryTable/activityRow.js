import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import {deleteGroup, selectGroup, selectGroupChanging, selectGroupForModal, groupChanged, editGroup, getGroups} from '../../../Action/groupAction'
import withAuthorization from '../../Session/withAuthorization';
// import {GroupModal} from './group_modal';
// import {UserList} from './group_userList'

class ActivityRow extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            selected : {}, 
            show:false,
            listShow:false,
            showList: "",
            tourGuides:[],
            leadChaperones:[],
            radioSelected: "",
            targetList:[],
            avaliableTourGuides:[],
            avaliableLeadChaperones:[],
            assignedTourGuide:{},
            assignedLeadChaperone:{}
        }
    }
    render(){
        return(
            <tr>
                <td>
                    {this.props.time} 
                </td>
                <td>      
                    {this.props.activity}          
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({
    // groups: state.groupState.groups,
    // selectedGroup: state.groupState.selectedGroup,
    // selectGroupChanged: state.groupState.selectGroupChanged,
    // groupChanging: state.groupState.groupChanging
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {}
    ),withAuthorization(condition)
)(ActivityRow);