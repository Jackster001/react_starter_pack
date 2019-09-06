import {db} from "../components/Firebase";

const getAbout = () =>{
    let data=Object.assign({})
    return (dispatch) => {
        db.collection("aboutInfo").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let about = doc.data();
            about = {id: doc.id, ...about}
            data=about;
            })           
            dispatch({
                type: "ABOUT_GET",
                payload: data
            })
         })
         .catch(function(error){
            console.log("Error getting document:", error);
         })
    }
}
const aboutReceived = () =>{
    return{
        type: "ABOUT_RECIEVED"
    }
}
const updateAbout = (contact) =>{
    return(dispatch)=>{
        db.collection("aboutInfo").doc(contact.id).set(contact).then(function() {
            dispatch({
                type:"EDIT_ABOUT",
                payload: contact
            })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } 
}
const aboutChanged=()=>{
    return{
        type: "ABOUT_CHANGED"
    }
}

export {getAbout, updateAbout, aboutChanged, aboutReceived}