import React from 'react';
import '../components.css';
import {withRouter} from 'react-router-dom'
import logo from '../images/SBNYC-logo.jpg'
import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import 'firebase/auth';
const INITIAL_STATE = {
   email: '',
   password: '',
   error: null,
   login: false
 };
 const Login = () => (
   <div>
      <SignInForm/>
   </div>
 );
 
class SignInFormBase extends React.Component {
   constructor(props){
      super(props);
      this.state = {...INITIAL_STATE};
   }
   onChange = event =>{
      this.setState({[event.target.name]: event.target.value})
   }
   onSubmit = (event) => {
      const {email, password} = this.state;
      console.log("clicked");
      
      this.props.firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(this.props.firebase)
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
      event.preventDefault();
      // admin.get().then(function(admin) {
      //    if (admin.exists) {
      //       let data= admin.data();
      //       if(data.Username== username && data.password == password){
      //          console.log("Success!")
      //          this.props.login =true
      //       }
      //       else{
      //          console.log("Did not match!");
               
      //       }
      //    } else {
      //        // doc.data() will be undefined in this case
      //        console.log("No such document!");
      //    }
      // }).catch(function(error) {
      //    console.log("Error getting document:", error);
      // });
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
               <h2>Admin Login</h2>
               <form className="loginForm" onSubmit={this.onSubmit}>
                  <input type="text" name="email" value={email} onChange = {this.onChange} placeholder="Email"/>
                  <br/><br/>
                  <input type="text" name="password" value={password} onChange = {this.onChange} placeholder="Password"/>
                  <br/><br/>
                  {/* <p onClick={this.onSubmit}>Sign In</p> */}
                  <button className="signIn" disabled={isInvalid}  type="submit">Sign In</button>
                  {error && <p>{error.message}</p>}
               </form>
               </center>
            </div>
         </div>
         </div>
      </div>
      );
   }
}
const SignInForm = compose (withFirebase, withRouter)(SignInFormBase);

export default Login
 
export {SignInForm};