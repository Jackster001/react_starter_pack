import {db} from "../components/Firebase";

const getLostNotifications = () =>{
    let data=Object.assign([])
    return (dispatch) => {
        db.collection("lostUsers").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let lostUser = doc.data();
            lostUser = {id: doc.id, ...lostUser}
            data=[lostUser,...data]
            })           
            dispatch({
                type: "LOST_GET",
                payload: data
            })
         })
         .catch(function(error){
            console.log("Error getting document:", error);
         })
    }
}
const deleteLostNotifications = (id) =>{
    db.collection("lostUsers").doc(id).delete().then(function(){
        console.log("Group successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return{
        type: "LOST_DELETE",
        id: id
    }
}

export {getLostNotifications, deleteLostNotifications}