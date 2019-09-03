import React from 'react';
import '../components.css';
import { withAuthorization } from '../Session';
import {getLostNotifications} from '../../Action/lostAction';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import LostTable from "../Tables/lostTable/lostTable";
class Lost extends React.Component {
   componentDidMount(){
      this.props.getLostNotifications();
   }
   render() {
      return (
      <div className="App"><br/>
         <center><h1>"I am Lost" Notifications</h1></center><br/><br/>
         <LostTable/>
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
     {getLostNotifications}
   ),withAuthorization(condition)
)(Lost);