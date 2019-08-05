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
const addUser = (user)=>{
    db.collection("Students").add({
        Details: user.Details,
        Chaperone: user.Chaperone,
        Group_Name: user.Group_Name,
        Group_Type: user.Group_Type,
        Tour_Guide: user.Tour_Guide,
        profilePicture: user.profilePicture
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    return {
        type: 'USER_ADD',
        payload: user
    }
    
}
const deleteUser = (id) =>{
    db.collection("Students").doc(id).delete().then(function(){
        console.log("Student successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return{
        type: "USER_DELETE",
        id: id
    }
}
const setUser = (id) =>{

}
export {getUsers, addUser, deleteUser, setUser};