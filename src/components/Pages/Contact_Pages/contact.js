import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
import ContactTable from "../../Tables/contactTable/contactTable";
import * as ROUTES from '../../../constants/routes';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getGroups} from '../../../Action/groupAction';
import {getContacts} from '../../../Action/contactAction';
class Contact extends React.Component {
   componentDidMount(){
      this.props.getContacts();
      this.props.getGroups();
   }
   render() {
      return (
         <div className="App">
         <div><br/>
            <center>
               <h1>Contact Management</h1>
               <Link to={ROUTES.CONTACT_ADD}><button className="addNew">Add Contact Information</button></Link>
            </center><br/><br/>
            <ContactTable/>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
const mapStateToProps = state => ({
});
export default compose(
   connect(
      mapStateToProps,
     {getGroups, getContacts}
   ),withAuthorization(condition)
)(Contact);