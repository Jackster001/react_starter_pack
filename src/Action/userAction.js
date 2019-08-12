import {db} from "../components/Firebase"
// import {dbMain} from "../components/Firebase/firebaseMain";

const getSingleUser= (id)=>{
    let user={}
    let stringId=''+id+'';
    return (dispatch)=>{
        let docRef=db.collection("Students").doc(stringId)
        docRef.get().then(function(doc){
        if(doc.exists){
            user=doc.data();
            user={...user, id}
        } else{
            console.log("Something went wrong!")
        }
        console.log(user)
        dispatch({
            type: "USERS_SELECT",
            payload: user,
            id: id
        })
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    }
    
}

const getUsers = () =>{
    let data=[];
    return (dispatch) => {
        // dbMain.collection("users").get().then(function(querySnapshot) {
        //     querySnapshot.forEach(function(doc) {
        //     let user = doc.data();
        //     user= {id:doc.id,...user}
        //     data.push(user);
        //     })
        //     dispatch({
        //         type: "USERS_GET",
        //         payload: data
        //     })
        //  })
        //  .catch(function(error){
        //     console.log("Error getting document:", error);
        //  })
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
const setUser = (user, id) =>{
    db.collection("Students").doc(id).set({
        Group_Name: user.Group_Name,
        Group_Type: user.Group_Type,
        Details: user.Details,
        Tour_Guide: user.Tour_Guide,
        Chaperone: user.Chaperone,
        profilePicture: user.profilePicture
    }).then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    return{
        type:"USER_SET",
        payload: user
    }
    
}
export {getUsers, addUser, deleteUser, getSingleUser, setUser};