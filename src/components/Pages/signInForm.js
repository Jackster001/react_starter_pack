import React from 'react';
import '../components.css';
import {withRouter} from 'react-router-dom'
import logo from '../images/TMA_logo.png'
import * as ROUTES from '../../constants/routes'
import 'firebase/auth';
import {login, getAdminInputs} from "../../Action"
import {connect} from "react-redux"
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    login: false
};

class SignInFormBase extends React.Component {
    constructor(props){
       super(props);
       this.state = {...INITIAL_STATE, getAdminInputs:{}};
    }
    componentDidMount(){
       this.props.getAdminInputs();
    }
    onChange = event =>{
       this.setState({[event.target.name]: event.target.value})
    }
    onSubmit = () => {
       const {email, password} = this.state;
       console.log("clicked");       
       this.props.login(email, password);
       
    }
    componentWillUpdate(){
      if(this.props.authUser){
         this.props.history.push(ROUTES.HOME);
      }
    }
   render() {
       const {
          email,
          password, 
          error
       } = this.state;
       const isInvalid = password === '' || email === '';
       return (
       <div className="App">
          <div className="loginPage">
             <div className="loginPos">
             <div><img src={logo} height="250px" width="650px"/></div>
             <div className="login">
                <center>
                <h2 onClick={this.random}>Admin Login</h2>
                   <input type="text" name="email" value={email} onChange = {this.onChange} placeholder="Email"/>
                   <br/><br/>
                   <input type="text" name="password" value={password} onChange = {this.onChange} placeholder="Password"/>
                   <br/><br/>
                   <button className="signIn" disabled={isInvalid} onClick={this.onSubmit} type="submit">Sign In</button>
                   {error && <p>{error.message}</p>}
                </center>
             </div>
          </div>
          </div>
       </div>
       );
    }
}
const mapStateToProps = state => ({
   authUser: state.sessionState.authUser,
});
const SignInForm = connect(mapStateToProps, {login, getAdminInputs})(SignInFormBase)
export default withRouter(SignInForm);