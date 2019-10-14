import {db, storageRef} from "../components/Firebase";

const selectItinerary= (id, index)=>{
    let itineraryData={}
    let stringId=''+id+'';
    let head= {}
    return (dispatch)=>{
        let docRef=db.collection("itineraries").doc(stringId)
        docRef.get().then(function(doc){
        if(doc.exists){
            let itinerary=doc.data();
            console.log(itinerary)
            head= itinerary
            let selectItinerary= itinerary.dailyData[index];
            itineraryData=selectItinerary
        } else{
            console.log("Something went wrong!")
        }
        dispatch({
            type: "ITINERARY_SELECT",
            payload: itineraryData,
            itineraryHead: head
        })
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    }
}
const selectItineraryChanging=()=>{
    return{
        type:"ITINERARY_SELECT_CHANGED"
    }
}
const getItineraries = () =>{
    let data=Object.assign([])
    return (dispatch) => {
        db.collection("itineraries").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let itinerary = doc.data();
            itinerary= {id:doc.id,...itinerary}
            data=[...data, itinerary]
            })           
            dispatch({
                type: "ITINERARIES_GET",
                payload: data
            })
         })
         .catch(function(error){
            console.log("Error getting document:", error);
         })
    }
}
const addItinerary = (itinerary)=>{
    return(dispatch)=>{
        db.collection("itinerary").add(itinerary).then(function(){
            dispatch({
                type: 'ITINERARY_SEND',
                payload: itinerary
            })
        }).catch(error => {
            console.log({ error });
        });
    }
}
const itineraryAdded=()=>{
    return {
        type: 'ITINERARY_ADDED'
    }
}
const deleteItinerary = (id) =>{
    db.collection("itineraries").doc(id).delete().then(function(){
        console.log("Group successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return{
        type: "ITINERARY_DELETE",
        id: id
    }
}
const editItinerary = (itinerary) =>{
    return(dispatch)=>{
        db.collection("itineraries").doc(itinerary.id).set(itinerary).then(function() {
            dispatch({
                type:"EDIT_ITINERARY",
                payload: itinerary
            })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } 
}
const itineraryChanged=()=>{
    return{
        type: "ITINERARY_CHANGED"
    }
}
export {getItineraries, addItinerary, itineraryAdded, deleteItinerary, selectItinerary, selectItineraryChanging, editItinerary, itineraryChanged}