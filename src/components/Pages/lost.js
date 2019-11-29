import React from 'react';
import '../components.css';
import { withAuthorization } from '../Session';
import {getLostNotifications, recievingNotifications} from '../../Action/lostAction';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import LostTable from "../Tables/lostTable/lostTable";
class Lost extends React.Component {
   constructor(props){
      super(props)
      this.state={
         activate: false
      }
   }
   componentDidMount(){
      this.props.getLostNotifications();
      console.log(this.props.lostNotifications)
   }
   componentDidUpdate(){
      if(this.props.gettingNotifications){
         this.props.recievingNotifications()
         this.setState({...this.state,activate:true})
      }
   }
   showLostNotificationTable(){
      if(this.state.activate){
         return <LostTable/>
      }
   }
   render() {
      return (
      <div className="App"><br/>
         <center><h1>"I am Lost" Notifications</h1></center><br/><br/>
         {this.showLostNotificationTable()}
      </div>
      );
   }
}
const condition = authUser => !!authUser;
const mapStateToProps = state => ({
   lostNotifications : state.lostState.lostNotifications,
   gettingNotifications : state.lostState.gettingNotifications
});
export default compose(
   connect(
      mapStateToProps,
     {getLostNotifications, recievingNotifications}
   ),withAuthorization(condition)
)(Lost);