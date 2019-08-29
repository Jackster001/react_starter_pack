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
import Contact from './components/Pages/contact';
import Content from './components/Pages/content';
import Settings from './components/Pages/settings';
import * as ROUTES from '../src/constants/routes';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { withAuthentication } from './components/Session';
import Navigation from './components/navigation';
import {auth} from "./components/Firebase";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    this.listener = auth.onAuthStateChanged(
    authUser => {
      authUser
        ? this.setState({ authUser: true })
        : this.setState({ authUser: null });
    });
  }
  componentWillUnmount() {
    this.listener();
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
              <Route path={ROUTES.CONTENT} component={Content} />
              <Route path={ROUTES.SETTINGS} component={Settings} />
            </div>
          </Router>
        <Footer/>
    </div>
  );
};
};
export default App;
