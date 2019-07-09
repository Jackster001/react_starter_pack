import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/Pages/login';
import Home from './components/Pages/home';
import Users from './components/Pages/users';
import Groups from './components/Pages/groups';
import Itinerary from './components/Pages/itinerary';
import Notifications from './components/Pages/notifications';
import Alarm from './components/Pages/alarm';
import Lost from './components/Pages/lost';
import Contact from './components/Pages/contact';
import Content from './components/Pages/content';
import Settings from './components/Pages/settings';
import * as ROUTES from '../src/constants/routes';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { withFirebase } from './components/Firebase';
// import SignUpPage,{ SignUpForm } from './components/Pages/signup';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
    authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }
  componentWillUnmount() {
    this.listener();
  }
  render(){
  return (
    <div className="App">
      <Header/>
          <Router>
            <div>
              <Route exact path={ROUTES.LANDING} component={Login} />
              {/* <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} /> */}
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.HOME} component={Home} />
              <Route path={ROUTES.USERS} component={Users} />
              <Route path={ROUTES.GROUPS} component={Groups} />
              <Route path={ROUTES.ITINERARY} component={Itinerary} />
              <Route path={ROUTES.NOTIFICATIONS} component={Notifications} />
              <Route path={ROUTES.ALARM} component={Alarm} />
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
export default withFirebase(App);
