import {db} from "../components/Firebase";
const getGroups = () =>{
    let data=[];
    return (dispatch) => {
        db.collection("groups").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let group = doc.data();
            group= {id:doc.id,...users}
            data.push(group);
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
export {getGroups}