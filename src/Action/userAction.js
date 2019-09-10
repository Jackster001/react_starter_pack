import {db,auth, storageRef} from "../components/Firebase";
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
        db.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let users = doc.data();
            users= {id:doc.id,...users}
            data=[users, ...data];
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
    return(dispatch)=>{
            storageRef.ref("user.png").getDownloadURL().then(url=>{
                let email= user.userName + "@mail.com"
                    auth.createUserWithEmailAndPassword(email, user.password)
                    .then(response=>{
                    db.collection("users").doc(response.user.uid).set({
                        id:response.user.uid,
                        GroupName: user.GroupName,
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
        console.log("Student successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return{
        type: "USER_DELETE",
        id: id
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
export {getUsers, addUser, deleteUser, getSingleUser, setUser, userAddedChanged, resetChanged, userResetChanged};