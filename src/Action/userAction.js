import {db,auth, storageRef, admin} from "../components/Firebase";
const resetChanged =() =>{
    return{
        type: "RESET_CHANGED"
    }
}
const userResetChanged =() =>{
    return{
        type: "USER_RESET_CHANGED"
    }
}
const userAddedChanged =() =>{
    return{
        type: "USER_ADDED"
    }
}
const getSingleUser= (id)=>{
    let user={}
    let stringId=''+id+'';
    return (dispatch)=>{
        dispatch({
            type: "CHANGE_LOADING"
        })
        let docRef=db.collection("users").doc(stringId)
        docRef.get().then(function(doc){
        if(doc.exists){
            user=doc.data();
            user={...user, id}
        } else{
            console.log("Something went wrong!")
        }
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
        db.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let users = doc.data();
            users= {id:doc.id,...users}
            data=[users, ...data];
            data.sort(function(a,b){
                return  a.dateCreated.seconds - b.dateCreated.seconds
            }).reverse();
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
const recievingUsers = () =>{
    return {
        type: "GETTING_USERS"
    }
}
const addUser = (user)=>{
    return(dispatch)=>{
            storageRef.ref("user.png").getDownloadURL().then(url=>{
                let email= user.userName + "@sbnyc.com"
                    auth.createUserWithEmailAndPassword(email, user.password)
                    .then(response=>{
                    db.collection("users").doc(response.user.uid).set({
                        id:response.user.uid,
                        dateCreated: user.dateCreated,
                        groupName: user.groupName,
                        groupPin: user.groupPin,
                        userType: user.userType,
                        userName: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber,
                        password: user.password,
                        tourGuide: user.tourGuide,
                        leadChaperone: user.leadChaperone,
                        profilePicture: url,
                        emergencyContact: user.emergencyContact
                        
                    })
                    user={
                        ...user,
                        id: response.user.uid,
                        profilePicture: url
                    }
                    dispatch({
                        type: 'USER_ADD',
                        payload: user
                    })
                    })
                }).catch(error => {
                console.log({ error });
            })
    }    
}
const deleteUser = (id) =>{
    db.collection("users").doc(id).delete().then(function(){
        console.log("User successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return{
        type: "USER_DELETE",
        id: id
    }
}
const finishedDeletingUser = () =>{
    return{
        type: "FINISHED_DELETING"
    }
}
const setUser = (user) =>{
    
    return(dispatch)=>{
        db.collection("users").doc(user.id).set(user).then(function() {
            dispatch({
                type: "USER_CHANGE_LOADING"
            })
            dispatch({
                type:"USER_SET",
                payload: user
            })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } 
}
export {getUsers, recievingUsers, addUser, deleteUser, getSingleUser, setUser, userAddedChanged, resetChanged, userResetChanged, finishedDeletingUser};