import {auth, db} from "../components/Firebase"

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
         auth.signInWithEmailAndPassword(email, password).then((user) => {
             dispatch({
                type: "AUTH_USER_SET",
                payload: true
            })
         }).catch(error =>{
             console.log(error);
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