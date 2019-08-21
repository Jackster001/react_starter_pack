import {db} from "../components/Firebase";

const selectAlarm= (id)=>{
    let alarmData={}
    let stringId=''+id+'';
    return (dispatch)=>{
        let docRef=db.collection("alarmss").doc(stringId)
        docRef.get().then(function(doc){
        if(doc.exists){
            let alarm=doc.data();
            alarmData={...alarm, id}
        } else{
            console.log("Something went wrong!")
        }
        dispatch({
            type: "ALARM_SELECT",
            payload: alarmData,
            id: id
        })
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    }
}
const selectAlarmChanging=()=>{
    return{
        type:"GROUP_SELECT_CHANGED"
    }
}
const getAlarms = () =>{
    let data=Object.assign([])
    return (dispatch) => {
        db.collection("alarms").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let alarm = {
                id:doc.id,
                groupPin: doc.data().groupPin,
                // timestamp: doc.data().timestamp,
                timestamp: new Date( doc.data().timestamp),
                title: doc.data().title                
            };
            // let alarm= doc.data()
            // console.log(alarm.timestamp)
            alarm = {id: doc.id, ...alarm}
            data=[...data, alarm]
            })           
            dispatch({
                type: "ALARMS_GET",
                payload: data
            })
         })
         .catch(function(error){
            console.log("Error getting document:", error);
         })
    }
}
const addAlarm = (newAlarm)=>{
    return(dispatch)=>{
        db.collection("alarms").add({
            notifType: "alarm",
            groupPin: newAlarm.groupPin,
            timestamp: newAlarm.timestamp,
            title: newAlarm.title
        }).then(function(){
            dispatch({
                type: 'GROUP_ADD',
                payload: newAlarm
            })
        }).catch(error => {
            console.log({ error });
        });
    }
}
const alarmAdded=()=>{
    return {
        type: 'GROUP_ADDED'
    }
}
const deleteAlarm = (id) =>{
    db.collection("groups").doc(id).delete().then(function(){
        console.log("Group successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return{
        type: "GROUP_DELETE",
        id: id
    }
}
const editAlarm = (group) =>{
    return(dispatch)=>{
        db.collection("groups").doc(group.id).set(group).then(function() {
            dispatch({
                type:"EDIT_GROUP",
                payload: group
            })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } 
}
const alarmChanged=()=>{
    return{
        type: "GROUP_CHANGED"
    }
}
export {getAlarms, addAlarm, alarmAdded, deleteAlarm, selectAlarm, selectAlarmChanging, editAlarm, alarmChanged}