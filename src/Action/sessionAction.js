import {auth, db} from "../components/Firebase"
import * as ROUTES from '../constants/routes'
import {withRouter} from 'react-router-dom'
const setUserAuth = () =>{
    return {
        type: "AUTH_USER_SET",
        payload: true
    }
}
const setOffUserAuth = () =>{
    return {
        type: "OFF_AUTH_USER_SET",
        payload: false
    }
}
const login = (email, password) =>{
     return (dispatch) => {
         
         auth.signInWithEmailAndPassword(email, password).then(() => {
             dispatch({
                type: "AUTH_USER_SET",
                payload: true
            })
         }).catch(error =>{
             console.log(error);
             alert("The email and password combination is incorrect");
         })
     }
}

const signOut = () =>{
    return (dispatch) =>{
        auth.signOut().then(() =>{
            dispatch({
                type: "OFF_AUTH_USER_SET",
                payload: false
            })
         }).catch(error =>{
             console.log(error);
        })
    }
}

export {setUserAuth,setOffUserAuth, login, signOut};