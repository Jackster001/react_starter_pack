import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import {getContacts} from '../../../Action/contactAction';
import { compose } from 'recompose';
import ContactRow from "./contactRow"
class ContactTable extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="basicTable">
            <table className="table1 table-dark" border="1" cellSpacing="0">
                <thead className="TableHead">
                <tr>
                    <th>Group Name</th>
                    <th>Hotel</th>
                    <th>Hotel Address</th>
                    <th>Phone Number</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                    { 
                        this.props.contacts.map(function(contact, i){ 
                            return (
                                <ContactRow
                                key={i}
                                id={contact.id}
                                groupName={contact.groupName}
                                groupPin={contact.groupPin}
                                hotelName={contact.hotelName}
                                address={contact.address}
                                phoneNumber={contact.phoneNumber}
                                />
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
      );
   }
}
const mapStateToProps = state => ({
    contacts: state.contactState.contacts
});
 
export default compose(
   connect(
     mapStateToProps,
     {getContacts}
   ),
)(ContactTable);