import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {editContact, contactChanged} from '../../../Action/contactAction'
class Edit_Contact extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectedContact: this.props.selectedContact,
            id: this.props.selectedContact.id,
            groupName: this.props.selectedContact.groupName,
            groupPin: this.props.selectedContact.groupPin,
            hotelName: this.props.selectedContact.hotelName,
            phoneNumber: this.props.selectedContact.phoneNumber,
            address: this.props.selectedContact.address
            }
        }
    componentDidUpdate(){
        if(this.props.contactChanging){
            this.props.contactChanged()
            this.props.history.push('/contacts');
        }
    }
    onChangeGroupName(event){
        return (
            this.setState({...this.state, groupName: event.target.value})
        )
    }
    onChangeHotelName(event){
        return (
            this.setState({...this.state, hotelName: event.target.value})
        )
    }
    onChangeHotelAddress(event){
        return (
            this.setState({...this.state, hotelAddress: event.target.value})
        )
    }
    onChangePhoneNumber(event){
        return (
            this.setState({...this.state, phoneNumber: event.target.value})
        )
    }
    onHandleEdit(){
        //setting the current date and time
        let date= new Date()

        //setting up new alarm
        let updatedContactInfo= {
            id: this.state.id,
            groupPin: this.state.groupPin,
            groupName: this.state.groupName,
            hotelName: this.state.hotelName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            timestamp: date
        }
        // call edit contact action
        this.props.editContact(updatedContactInfo)
    }
    render() {
        return (
            <div>
                <br/><br/><br/><br/>
                <div className="add_Table_Styles">
                <div className="editFormHeading"><h1>Contact Management</h1></div>
                <form className="add_form">
                <center><h2>Edit Contact Information</h2></center>
                    <label htmlFor="group_name"><b>Group Name: </b></label>
                    <select name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                    <option disabled selected defaultValue>{this.props.selectedContact.groupName}</option>
                        {this.props.groups.map(function(group){
                            return (<option value={group.name}>{group.name}</option>)
                        })}
                    </select>
                    <label htmlFor="Hotel_Name"><b>Hotel Name: </b></label>
                    <input type="text" name="Hotel_Name" placeholder={this.props.selectedContact.hotelName} onChange={this.onChangeHotelName.bind(this)}></input>
                    <label htmlFor="Hotel_Address"><b>Hotel Address: </b></label>
                    <input type="text" name="Hotel_Address" placeholder={this.props.selectedContact.address} onChange={this.onChangeHotelAddress.bind(this)}></input>
                    <label htmlFor="Hotel_Phone"><b>Phone Number: </b></label>
                    <input type="tel" name="Hotel_Phone" placeholder={this.props.selectedContact.phoneNumber} onChange={this.onChangePhoneNumber.bind(this)}></input>
                    <br/><br/>
                    <button type="button" className="update_Button" onClick={()=>this.onHandleEdit()}>Edit Contact Information</button>
                </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    groups: state.groupState.groups,
    selectedContact: state.contactState.selectedContact,
    contactChanging: state.contactState.contactChanging
});
const condition = authUser => !!authUser;
export default compose(
    connect(
        mapStateToProps,
        {editContact, contactChanged}
    ),withAuthorization(condition)
)(Edit_Contact);

