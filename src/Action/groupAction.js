import {db} from "../components/Firebase";

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
const addGroup = (group)=>{
    return(dispatch)=>{
        db.collection("groups").add({
            name: group.GroupName,
            pin: group.GroupPin,
            Group_Information: group.GroupInfo
            // director: group.director,
            // subGroups: group.subGroups
        }).then(function(){
            dispatch({
                type: 'GROUP_ADD',
                payload: group
            })
        }).catch(error => {
            console.log({ error });
        });
    }
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
const editGroup = (group) =>{
    return(dispatch)=>{
        db.collection("group").doc(group.id).set(group).then(function() {
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
const groupChanged=()=>{
    return{
        type: "GROUP_CHANGED"
    }
}
export {getGroups, addGroup, groupAdded, deleteGroup, selectGroup, selectGroupChanging, editGroup, groupChanged}