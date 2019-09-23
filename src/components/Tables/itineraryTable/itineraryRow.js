import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import {deleteGroup, selectGroup, selectGroupChanging, selectGroupForModal, groupChanged, editGroup, getGroups} from '../../../Action/groupAction'
import withAuthorization from '../../Session/withAuthorization';
// import {GroupModal} from './group_modal';
// import {UserList} from './group_userList'

class ItineraryRow extends React.PureComponent{
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
    componentDidMount(){
        let tourguides = this.props.avaliableTourGuides.map( guide=>{
            return {
                id: guide.id,
                firstName:guide.firstName, 
                lastName: guide.lastName
            }
        })
        let leadChaperones = this.props.avaliableLeadChaperones.map( guide=>{
            return {
                id: guide.id,
                firstName:guide.firstName, 
                lastName: guide.lastName
            }
        })
        this.setState({...this.state, avaliableTourGuides: tourguides, avaliableLeadChaperones: leadChaperones})
        if(this.props.subgroup[0]){
            let subgroup= Object.assign([],this.props.subgroup);
            let leadChaps= [];
            let tourGuides=[];
            subgroup.map(group=>{
                if(group.leadChaperone){
                    leadChaps.push(""+group.leadChaperone.firstName+" "+group.leadChaperone.lastName)
                }
                if(group.tourGuide){
                    tourGuides.push(""+group.tourGuide.firstName+" "+group.tourGuide.lastName)
                }
            })
            this.setState({tourGuides: tourGuides, leadChaperones: leadChaps});
        }
    }
    componentDidUpdate(){
        if(this.props.selectGroupChanged){
            this.props.selectGroupChanging()
            this.props.history.push('/group/'+this.props.id);        
        } 
        if(this.props.groupChanging){
            this.props.groupChanged();
            window.location.reload();
            this.hideModal();
        }
    }
    handleDelete(id){
        alert("User with id:"+this.props.id+" has been deleted from the database");
        this.props.deleteGroup(id);
    }
    selected(id){
        this.props.selectGroup(id);
    }
    showModal = () => {
        let show=true;
        this.setState({show: show});
        this.props.selectGroupForModal(this.props.id);
    };
    hideModal = () => {
        this.setState({...this.state, forAssign: false})
        this.setState({ show: false, listShow: false });
     };
    onHandleEdit(){
        let newItem={
           id: this.props.selected.id,
           Date: this.props.selected.Date,
           Time: this.props.selected.Time,
           Description: this.props.selected.Description
        }
        let current= this.state.selectedActivity
        if(current.Date != null){
           newItem.Date=current.Date 
        }
        if(current.Time != null){
           newItem.Time =current.Time 
        }
        if(current.Description != null){
           newItem.Description=current.Description 
        }
        
        this.props.editItem(newItem)
        this.hideModal();
    }
    onChangeTourGuidesSelected(event){
        let tourguide= this.state.avaliableTourGuides.find(guide => guide.id === event.target.value);
        return this.setState({...this.state, assignedTourGuide: tourguide});
    }
    onChangeLeadChaperonesSelected(event){
        let leadChaperone= this.state.avaliableLeadChaperones.find(chap => chap.id === event.target.value);
        return this.setState({...this.state, assignedLeadChaperone: leadChaperone});
    }
    assign(){
        let subgroups = this.props.selectedGroup.subGroups;
        let tourguide = this.state.assignedTourGuide;
        let leadChaperone = this.state.assignedLeadChaperone;
        let bus= {
            leadChaperone : {...leadChaperone},
            tourGuide : {...tourguide}
        }
        subgroups.push(bus);
        let updateGroup= {...this.props.selectedGroup,
            subGroups: subgroups
        }
        this.props.editGroup(updateGroup);
    }
    render(){
        return(
            <tr>
                <td><center><h2><b>{this.props.groupName}</b></h2><h4>Group Pin: {this.props.groupPin}</h4></center></td>
                <td><center><img className="Group_Logo_Table" src={this.props.groupLogo} /></center></td>
                <td>
                    {this.state.tourGuides.map((name,i)=>{
                        return <p>{name}</p>
                    })} 
                </td>
                <td>      
                    {this.state.leadChaperones.map((name,i)=>{
                        return <p>{name}</p>
                    })}          
                </td>
                <td>
                <center><button className="edit_button" onClick={()=>this.selected(this.props.id)}>Edit</button><br/>
                    <button className="assignButton" onClick={()=>this.showModal()}>Assign</button><br/><br/></center>

                    <center><button className="delete_button" id={this.props.id} onClick={() => { if (window.confirm('Are you sure you wish to delete this Group?')) this.handleDelete(this.props.id)}}>Delete</button></center>
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
)(ItineraryRow);