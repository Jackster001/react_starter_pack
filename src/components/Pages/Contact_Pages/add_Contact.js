import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {addContact, contactAdded} from '../../../Action/contactAction';
import * as ROUTES from '../../../constants/routes';

class Add_Contact extends React.Component {
   constructor(props){
      super(props);
      this.state={
            groupName: "",
            hotelName: "",
            hotelAddress: "",
            phoneNumber: "",
         }
    }
    componentDidUpdate(){
        if(this.props.contactAdding){
            console.log(this.props.contactAdding)
            this.props.contactAdded()
                this.props.history.push(ROUTES.CONTACT)
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
    addContact(){
        //getting the current date and time
        let date=new Date();

        //getting the group pin 
        let groupName= this.state.groupName;
        let group=Object.assign([{}])
        group= this.props.groups.filter(function(group){
            return (group.name == groupName)
        })
        let selectedGroup=Object.assign({},group[0])
        let groupPin=selectedGroup.pin;

        //setting up new contact
        let newContactInfo= {
            groupPin: groupPin,
            groupName: this.state.groupName,
            hotelName: this.state.hotelName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.hotelAddress,
            timestamp: date
        }
        //called contact action to add to firebase
        this.props.addContact(newContactInfo)
    }
    render() {
        return (
            <div>
                <br/><br/><br/><br/>
                <div className="add_Table_Styles">
                <div className="addFormHeading"><h1>Contact Management</h1></div>
                <form className="add_form">
                    <center><h2>Contact Details</h2></center>
                    <label htmlFor="group_name"><b>Group Name: </b></label>
                    <select name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                    <option disabled selected defaultValue> -- select an option -- </option>
                        {this.props.groups.map(function(group){
                            return (<option value={group.name}>{group.name}</option>)
                        })}
                    </select>
                    <label htmlFor="Hotel_Name"><b>Hotel Name: </b></label>
                    <input type="text" name="Hotel_Name" onChange={this.onChangeHotelName.bind(this)}></input>
                    <label htmlFor="Hotel_Address"><b>Hotel Address: </b></label>
                    <input type="text" name="Hotel_Address" onChange={this.onChangeHotelAddress.bind(this)}></input>
                    <label htmlFor="Hotel_Phone"><b>Phone Number: </b></label>
                    <input type="tel" name="Hotel_Phone" onChange={this.onChangePhoneNumber.bind(this)}></input>
                    <br/><br/>
                    <button type="button" className="Submit_Button" onClick={()=>this.addContact()}>Add Contact Information</button>
                </form>
            </div>
            </div>
        );
    }
    }
const mapStateToProps = state => ({
    groups: state.groupState.groups,
    contacts: state.contactState.contacts,
    contactAdding: state.contactState.contactAdding
 });
const condition = authUser => !!authUser;
export default compose(
   connect(
     mapStateToProps,
     {addContact, contactAdded}
   ),withAuthorization(condition)
)(Add_Contact);