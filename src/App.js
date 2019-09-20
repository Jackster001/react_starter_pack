import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/Pages/login';
import Home from './components/Pages/home';
import Users from './components/Pages/User_Pages/users';
import addUser from "./components/Pages/User_Pages/add_User";
import User_Edit from "./components/Pages/User_Pages/edit_User";
import Groups from './components/Pages/Group_Pages/groups';
import addGroup from './components/Pages/Group_Pages/add_Group';
import groupEdit from './components/Pages/Group_Pages/groupEdit';
import Itinerary from './components/Pages/itinerary';
import Notifications from './components/Pages/Notification_Pages/notifications';
import Send_Notification from './components/Pages/Notification_Pages/send_Notification'
import Alarm from './components/Pages/Alarm_Pages/alarm';
import Add_Alarm from './components/Pages/Alarm_Pages/add_Alarm';
import Edit_Alarm from './components/Pages/Alarm_Pages/edit_Alarm';
import Lost from './components/Pages/lost';
import Contact from './components/Pages/Contact_Pages/contact';
import Add_Contact from './components/Pages/Contact_Pages/add_Contact';
import Edit_Contact from './components/Pages/Contact_Pages/edit_Contact';
import About from './components/Pages/About_Pages/about.js';
import Settings from './components/Pages/settings';
import * as ROUTES from '../src/constants/routes';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/navigation';
import {auth} from "./components/Firebase";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {signOut} from "../src/Action/sessionAction";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      loginStatus: false
    };
    this.events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress',
      'onbeforeunload'
    ];
    this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }
    if(this.props.authUser){
      this.setTimeout();
    }
    window.addEventListener("beforeunload", function (ev) {
      ev.preventDefault();
      this.props.signOut()
    })
  }
  componentDidMount() {
    this.listener = auth.onAuthStateChanged(
    authUser => {
      authUser
        ? this.setState({ authUser: true })
        : this.setState({ authUser: null });
    });
    this.setState({loginStatus:this.props.authUser})
    window.addEventListener("beforeunload", function (ev) {
      ev.preventDefault();
      this.props.signOut()
    })
  }
  componentDidUpdate(){
    if(this.props.authUser && this.state.loginStatus != true){
      this.setState({loginStatus:this.props.authUser})
    }
  }
  componentWillUnmount() {
    this.listener();
    window.addEventListener("beforeunload", function (ev) {
      ev.preventDefault();
      this.props.signOut()
    })
  }
  clearTimeout() {
      if (this.warnTimeout) clearTimeout(this.warnTimeout);
      if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
      if(this.state.loginStatus && this.props.authUser){
      this.logoutTimeout = setTimeout(this.logout, 9000 * 1000);
      }
    
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }
  warn() {
    alert("You will be logged out automatically in 2 seconds");
  }
  logout = () => {
    this.props.signOut()
    this.setState({loginStatus: false})
    alert("You have been logged out due to being idle")
  };
  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }
  render(){
  return (
    <div className="App">
      <Header />
          <Router>
            <div>
              <Navigation authUser={this.state.authUser}/>
              <Route exact path={ROUTES.LANDING} component={Login} />
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.HOME} component={Home} />
              <Route path={ROUTES.USERS} component={Users} />
              <Route path={ROUTES.USER_ADD} component={addUser} />
              <Route path={ROUTES.USER_EDIT} component={User_Edit} />
              <Route path={ROUTES.GROUPS} component={Groups} />
              <Route path={ROUTES.GROUP_ADD} component={addGroup} />
              <Route path={ROUTES.GROUP_EDIT} component={groupEdit} />
              <Route path={ROUTES.ITINERARY} component={Itinerary} />
              <Route path={ROUTES.NOTIFICATIONS} component={Notifications} />
              <Route path={ROUTES.SEND_NOTIFICATION} component={Send_Notification}/>
              <Route path={ROUTES.ALARMS} component={Alarm} />
              <Route path={ROUTES.ALARM_ADD} component={Add_Alarm} />
              <Route path={ROUTES.ALARM_EDIT} component={Edit_Alarm} />
              <Route path={ROUTES.LOST} component={Lost} />
              <Route path={ROUTES.CONTACT} component={Contact} />
              <Route path={ROUTES.CONTACT_ADD} component={Add_Contact} />
              <Route path={ROUTES.CONTACT_EDIT} component={Edit_Contact} />
              <Route path={ROUTES.ABOUT} component={About} />
              <Route path={ROUTES.SETTINGS} component={Settings} />
            </div>
          </Router>
        <Footer/>
    </div>
  );
};
};
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});
export default compose( 
  connect( mapStateToProps,{signOut})
)(App);

