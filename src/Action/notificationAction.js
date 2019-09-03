import {db} from "../components/Firebase";

const selectNotification= (id)=>{
    let notificationData={}
    let stringId=''+id+'';
    return (dispatch)=>{
        let docRef=db.collection("notifications").doc(stringId)
        docRef.get().then(function(doc){
        if(doc.exists){
            let notification=doc.data();
            notificationData={...notification, id}
        } else{
            console.log("Something went wrong!")
        }
        dispatch({
            type: "NOTIFICATION_SELECT",
            payload: notificationData,
            id: id
        })
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    }
}
const selectNotificationChanging=()=>{
    return{
        type:"NOTIFICATION_SELECT_CHANGED"
    }
}
const getNotifications = () =>{
    let data=Object.assign([])
    return (dispatch) => {
        db.collection("notifications").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let notification = doc.data();
            notification = {id: doc.id, ...notification}
            data=[notification, ...data]
            })           
            dispatch({
                type: "NOTIFICATIONS_GET",
                payload: data
            })
         })
         .catch(function(error){
            console.log("Error getting document:", error);
         })
    }
}
const recievedNotifications = () =>{
    return {
        type: "NOTIFICATIONS_GETTING"
    }
}
const sendNotification = (newNotification)=>{
    return(dispatch)=>{
        db.collection("notifications").add(newNotification).then(function(){
            dispatch({
                type: 'NOTIFICATION_SEND',
                payload: newNotification
            })
        }).catch(error => {
            console.log({ error });
        });
    }
}
const notificationSent=()=>{
    return {
        type: 'NOTIFICATION_SENT'
    }
}
const deleteNotification = (id) =>{
    db.collection("notifications").doc(id).delete().then(function(){
        console.log("Notification successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return{
        type: "NOTIFICATION_DELETE",
        id: id
    }
}
const editNotification = (notification) =>{
    return(dispatch)=>{
        db.collection("notifications").doc(notification.id).set(notification).then(function() {
            dispatch({
                type:"EDIT_NOTIFICATION",
                payload: notification
            })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } 
}
const notificationChanged=()=>{
    return{
        type: "NOTIFICATION_CHANGED"
    }
}
export {getNotifications, sendNotification, notificationSent, deleteNotification, selectNotification, selectNotificationChanging, editNotification, notificationChanged, recievedNotifications}