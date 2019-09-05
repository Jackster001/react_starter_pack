const INITIAL_STATE = {
    contacts: [{}],
    contactsGetting: false,
    contactAdding: false,
    selectedContact: {},
    selectContactsChanged: false,
    contactsChanging: false
};
function contactReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'CONTACTS_GET': {
        return {...state, contacts: action.payload, contactsGetting: true};
      }
      case "CONTACTS_GETTING":{
        return {...state, contactsGetting: false}
      }
      case 'CONTACT_SEND': {
        return {...state, contacts: [action.payload,...state.contacts], contactAdding: true};
      }
      case 'CONTACT_SENT': {
        return {...state, contactAdding: false}
      }
      case 'CONTACT_SELECT': {
        return {...state, selectedContact: action.payload, selectContactChanged: true};
      }
      case 'CONTACT_SELECT_CHANGED':{
        return {...state, selectContactChanged: false}
      }
      case 'EDIT_CONTACT': {
        const index= state.contacts.findIndex(contact => {return contact.id == state.selectedContact.id})
        const newContactSet = state.contacts;
        newContactSet[index]= action.payload;
        return {...state, contacts: newContactSet, contactChanging:true};
      }
      case 'CONTACT_CHANGED':{
        return{...state, contactChanging:false}
      }
      case "CONTACT_DELETE": {
        const newContacts = Object.assign([],{...state.contacts});
        const index= state.contacts.findIndex(contact => {return contact.id == action.id})
        newContacts.splice(index, 1)
        return {...state, contacts: newContacts, contactDeleting: true};
      }
      default:
        return state;
    }
  }
  
export default contactReducer;