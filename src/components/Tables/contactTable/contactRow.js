import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {deleteContact, selectContact, selectContactChanging} from '../../../Action/contactAction';
import withAuthorization from '../../Session/withAuthorization';
import { Link} from 'react-router-dom'
class ContactRow extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            groupName: "",
            selected : {}
        }
    }
    componentDidUpdate(){
        if(this.props.selectContactChanged){
            this.props.selectContactChanging()
            this.props.history.push('/contact/'+this.props.id);        
        } 
    }
    handleDelete(id){
        alert("Contact with id:"+this.props.id+" has been deleted from the database");
        this.props.deleteContact(id);
    }
    selected(id){
        this.props.selectContact(id)
    }
    render(){
        return(
            <tr>
                <td><center>{this.props.groupName}</center></td>
                <td><center>{this.props.hotelName}</center></td>
                <td><center>{this.props.address}</center></td>
                <td><center>{this.props.phoneNumber}</center></td>                
                <td><center>
                    <button className="edit_button" onClick={()=> this.selected(this.props.id)}>Edit</button><br/>
                    <button className="delete_button" id={this.props.id} onClick={()=>this.handleDelete(this.props.id)}>Delete</button></center>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({
    contacts: state.contactState.contacts,
    selectedContact: state.contactState.selectedContact,
    selectContactChanged: state.contactState.selectContactChanged
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {deleteContact, selectContact, selectContactChanging}
    ),withAuthorization(condition)
)(ContactRow);