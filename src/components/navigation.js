import React from 'react';
import './components.css';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import SignOutButton from './Pages/signout';
import * as ROUTES from '../constants/routes';
import { connect } from 'react-redux';
const Navigation = ({ authUser }) => (
   
<div onClick={console.log(authUser)}>{authUser ==true ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />} </div>
 );
   const NavigationAuth = () => (
          <div className="nav">
              <div className="navMid">
             <ul>
                <li>
                <Link className="links" to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                <Link className="links" to={ROUTES.USERS}>Users</Link>
                </li>
                <li>
                <Link className="links" to={ROUTES.GROUPS}>Groups</Link>
                </li>
                <li>
                <Link className="links" to={ROUTES.ITINERARY}>Itinerary</Link>
                </li>
                <li>
                <Link className="links" to={ROUTES.NOTIFICATIONS}>Notifications</Link>
                </li>
                <li>
                <Link className="links" to={ROUTES.ALARM}>Alarm</Link>
                </li>
                <li>
                <Link className="links" to={ROUTES.LOST}>I am Lost</Link>
                </li>
                <li>
                <Link className="links" to={ROUTES.CONTACT}>Contact Info</Link>
                </li>
                <li>
                <Link className="links" to={ROUTES.CONTENT}>Content</Link>
                </li>
                <li>
                <Link className="links" to={ROUTES.SETTINGS}>Settings</Link>
                </li>
                <li>
                <Link to={ROUTES.LOGIN}><SignOutButton/></Link>
                </li>
            </ul> 
            <br/></div>
          </div>
        
      );
      const NavigationNonAuth = () => (
         <div></div>
      );
const mapStateToProps = state => ({
   authUser: state.sessionState.authUser,
 });
export default connect(mapStateToProps)(Navigation);