import {auth, db} from "../components/Firebase"

let data=[];

const getSingleUser= ()=>{
    return{
        type: "USERS_GET",
        payload: data
    }
}

const getUsers = () =>{
    data=[];
    return (dispatch) => {
        db.collection("Students").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let users = doc.data();
            users= {id:doc.id,...users,profilePicture:""}
            data.push(users);
            })
            dispatch({
                type: "USERS_GET",
                payload: data
            })
         })
         .catch(function(error){
            console.log("Error getting document:", error);
         })
    }
}

// const addUser = (firstName, lastName, phoneNumber, )
export {getUsers};