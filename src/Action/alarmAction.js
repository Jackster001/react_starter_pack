import {db} from "../components/Firebase";

const selectAlarm= (id)=>{
    let alarmData={}
    let stringId=''+id+'';
    return (dispatch)=>{
        let docRef=db.collection("alarms").doc(stringId)
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
        type:"ALARM_SELECT_CHANGED"
    }
}
const getAlarms = () =>{
    let data=Object.assign([])
    return (dispatch) => {
        db.collection("alarms").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let alarm = doc.data();
            alarm = {id: doc.id, ...alarm}
            data=[...data, alarm]
            data.sort(function(a,b){
                return  a.timestamp.seconds - b.timestamp.seconds
            }).reverse();
            })           
            console.log(data)
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
const recievingAlarms = () =>{
    return{
        type:"GETTING_ALARMS"
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
                type: 'ALARM_ADD',
                payload: newAlarm
            })
        }).catch(error => {
            console.log({ error });
        });
    }
}
const alarmAdded=()=>{
    return {
        type: 'ALARM_ADDED'
    }
}
const deleteAlarm = (id) =>{
    db.collection("alarms").doc(id).delete().then(function(){
        console.log("Group successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return{
        type: "ALARM_DELETE",
        id: id
    }
}
const editAlarm = (alarm) =>{
    return(dispatch)=>{
        db.collection("alarms").doc(alarm.id).set(alarm).then(function() {
            dispatch({
                type:"EDIT_ALARM",
                payload: alarm
            })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } 
}
const alarmChanged=()=>{
    return{
        type: "ALARM_CHANGED"
    }
}
export {getAlarms,recievingAlarms, addAlarm, alarmAdded, deleteAlarm, selectAlarm, selectAlarmChanging, editAlarm, alarmChanged}