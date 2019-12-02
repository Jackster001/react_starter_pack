import {db, storageRef} from "../components/Firebase";
import { file } from "@babel/types";

const selectGroup= (id)=>{
    let groupData={}
    let stringId=''+id+'';
    return (dispatch)=>{
        let docRef=db.collection("groups").doc(stringId)
        docRef.get().then(function(doc){
        if(doc.exists){
            let group=doc.data();
            groupData={...group, id}
        } else{
            console.log("Something went wrong!")
        }
        dispatch({
            type: "GROUP_SELECT",
            payload: groupData,
            id: id
        })
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    }
}
const selectGroupChanging=()=>{
    return{
        type:"GROUP_SELECT_CHANGED"
    }
}
const selectGroupForModal= (id)=>{
    let groupData={}
    let stringId=''+id+'';
    return (dispatch)=>{
        let docRef=db.collection("groups").doc(stringId)
        docRef.get().then(function(doc){
        if(doc.exists){
            let group=doc.data();
            groupData={...group, id}
        } else{
            console.log("Something went wrong!")
        }
        dispatch({
            type: "GROUP_SELECT_FOR_MODAL",
            payload: groupData,
            id: id
        })
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    }
}
const groupModalSelecting = () =>{
    return{
        type: "GROUP_MODAL_SELECTING"
    }
}
const getGroups = () =>{
    let data=Object.assign([])
    return (dispatch) => {
        db.collection("groups").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let group = doc.data();
            group= {id:doc.id,...group}
            data=[...data, group]
            })           
            dispatch({
                type: "GROUPS_GET",
                payload: data
            })
         })
         .catch(function(error){
            console.log("Error getting document:", error);
         })
    }
}
const gettingGroups = () =>{
    return{
        type: "GROUP_GETTING"
    }
}
const addGroup = (group)=>{
    return (dispatch)=>{
        storageRef.ref('groupLogos').child(group.GroupLogo.name)
        .put(group.GroupLogo,{contentType:group.GroupLogo.type})
        .then(()=>{
            storageRef.ref('groupLogos').child(group.GroupLogo.name).getDownloadURL().then(url=>{
                db.collection("groups").add({
                    name: group.GroupName,
                    pin: group.GroupPin,
                    groupLogo:url,
                    startDate: group.startDate,
                    endDate: group.endDate,
                    subGroups: []
                }).then(function(){
                    let newGroup={...group, groupLogo:url}
                        dispatch({type: 'GROUP_ADD',
                        payload: newGroup})
                }).catch(error => {
                    console.log({ error });
                });
            }).catch(error => {
                console.log({ error });
            })
        }).then(()=>{
            db.collection("itineraries").add({
                groupName: group.GroupName,
                groupPin: group.GroupPin,
                dailyData:[]
            })
        }).catch(error => {
            console.log({ error });
    })}
}
const groupAdded=()=>{
    return {
        type: 'GROUP_ADDED'
    }
}
const deleteGroup = (id) =>{
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
const editGroup = (group, logoChanged) =>{
    return(dispatch)=>{
        if(logoChanged){
            storageRef.ref('groupLogos').child(group.groupLogo.name)
            .put(group.groupLogo,{contentType:group.groupLogo.type})
            .then(()=>{
            storageRef.ref('groupLogos').child(group.groupLogo.name).getDownloadURL().then(url=>{
                db.collection("groups").doc(group.id).set({
                    name: group.name,
                    pin: group.pin,
                    groupLogo:url
                }).then(function(){
                    let newGroup={...group, groupLogo:url}
                    dispatch({type: 'EDIT_GROUP',
                    payload: newGroup})
                }).catch(error => {
                    console.log({ error });
                });
            }).catch(error => {
                console.log({ error });
            })
        }).catch(error => {
            console.log({ error });
        })
        }
        else{
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
}
const groupChanged=()=>{
    return{
        type: "GROUP_CHANGED"
    }
}
export {getGroups,gettingGroups, addGroup, groupAdded, deleteGroup, selectGroup, selectGroupChanging, editGroup, groupChanged, selectGroupForModal, groupModalSelecting}