import {db} from "../components/Firebase";

const selectContact= (id)=>{
    let contactData={}
    let stringId=''+id+'';
    return (dispatch)=>{
        let docRef=db.collection("contactInfo").doc(stringId)
        docRef.get().then(function(doc){
        if(doc.exists){
            let contact=doc.data();
            contactData={...contact, id}
        } else{
            console.log("Something went wrong!")
        }
        dispatch({
            type: "CONTACT_SELECT",
            payload: contactData,
            id: id
        })
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    }
}
const selectContactChanging=()=>{
    return{
        type:"CONTACT_SELECT_CHANGED"
    }
}
const getContacts = () =>{
    let data=Object.assign([])
    return (dispatch) => {
        db.collection("contactInfo").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let contact = doc.data();
            contact = {id: doc.id, ...contact}
            data=[contact, ...data]
            })           
            data.sort(function(a,b){
                return  a.timestamp.seconds - b.timestamp.seconds
            }).reverse();
            dispatch({
                type: "CONTACTS_GET",
                payload: data
            })
         })
         .catch(function(error){
            console.log("Error getting document:", error);
         })
    }
}
const recievedContacts = () =>{
    return {
        type: "CONTACTS_GETTING"
    }
}
const addContact = (newContact)=>{
    return(dispatch)=>{
        db.collection("contactInfo").add(newContact).then(function(){
            dispatch({
                type: 'CONTACT_SEND',
                payload: newContact
            })
        }).catch(error => {
            console.log({ error });
        });
    }
}
const contactAdded=()=>{
    return {
        type: 'CONTACT_SENT'
    }
}
const deleteContact = (id) =>{
    db.collection("contactInfo").doc(id).delete().then(function(){
        console.log("Contact successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return{
        type: "CONTACT_DELETE",
        id: id
    }
}
const editContact = (contact) =>{
    return(dispatch)=>{
        db.collection("contactInfo").doc(contact.id).set(contact).then(function() {
            dispatch({
                type:"EDIT_CONTACT",
                payload: contact
            })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } 
}
const contactChanged=()=>{
    return{
        type: "CONTACT_CHANGED"
    }
}
export {getContacts, addContact, contactAdded, deleteContact, selectContact, selectContactChanging, editContact, contactChanged, recievedContacts}