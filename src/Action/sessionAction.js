import {auth, db} from "../components/Firebase"
import * as ROUTES from '../constants/routes'
import {withRouter} from 'react-router-dom'
import {persistor} from '../reduxConfig'
import { persistCombineReducers } from "redux-persist"
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
const getAdminInputs = () =>{
    return (dispatch) => {
        db.collection("admin").doc("adminLogin").get().then(doc=>{
            if(doc.exists){
                console.log("Signed In");
            }
            else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
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
            persistor.purge().then(()=>{
                console.log("purge")
                dispatch({
                type: "OFF_AUTH_USER_SET",
                payload: false
            })
            })
            
         }).catch(error =>{
             console.log(error);
        })
    }
}

export {setUserAuth,setOffUserAuth, login, signOut, getAdminInputs};