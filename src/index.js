import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
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
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
        <Route exact="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/groups" component={Groups} />
        <Route path="/itinerary" component={Itinerary} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/alarm" component={Alarm} />
        <Route path="/lost" component={Lost} />
        <Route path="/Contact" component={Contact} />
        <Route path="/Content" component={Content} />
        <Route path="/settings" component={Settings} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.unregister();
