import React from 'react';
import './components.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from '../App';
// import User from './Pages/user';
import Home from './Pages/home';
class Navigation extends React.Component {
   render() {
      return (
          <div className="nav">
              <div className="navMid">
             <ul>
                <li>
                <Link className="links" to="/home">Home</Link>
                </li>
                <li>
                <Link className="links" to="/users">Users</Link>
                </li>
                <li>
                <Link className="links" to="/groups">Groups</Link>
                </li>
                <li>
                <Link className="links" to="/itinerary">Itinerary</Link>
                </li>
                <li>
                <Link className="links" to="/notifications">Notifications</Link>
                </li>
                <li>
                <Link className="links" to="/alarm">Alarm</Link>
                </li>
                <li>
                <Link className="links" to="/lost">I am Lost</Link>
                </li>
                <li>
                <Link className="links" to="/contact">Contact Info</Link>
                </li>
                <li>
                <Link className="links" to="/content">Content</Link>
                </li>
                <li>
                <Link className="links" to="/settings">Settings</Link>
                </li>
            </ul> 
            <br/></div>
          </div>
        
      );
   }
}
export default Navigation