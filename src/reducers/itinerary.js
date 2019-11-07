const INITIAL_STATE = {
    itineraries: [{}],
    itinerariesGetting: false,
    itineraryAdding: false,
    selectedItinerary: {},
    selectItinerariesChanged: false,
    itinerariesChanging: false,
    itineraryHead:{}
}; 
function itineraryReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'ITINERARIES_GET': {
        return {...state, itineraries: action.payload, itinerariesGetting: true};
      }
      case "ITINERARIES_GETTING":{
        return {...state, itinerariesGetting: false}
      }
      case 'ITINERARY_ADD': {
        return {...state, itineraries: [action.payload,...state.itineraries], itineraryAdding: true};
      }
      case 'ITINERARY_ADDED': {
        return {...state, itineraryAdding: false}
      }
      case 'ITINERARY_SELECT': {
        return {...state, selectedItinerary: {...action.payload}, itineraryHead: action.itineraryHead, selectItineraryChanged: true};
      }
      case 'ITINERARY_SELECT_CHANGED':{
        return {...state, selectItineraryChanged: false}
      }
      case 'EDIT_ITINERARY': {
        const index= state.itineraries.findIndex(itinerary => {return itinerary.id == state.selectedItinerary.id})
        const newItinerarySet = state.itineraries;
        newItinerarySet[index]= action.payload;
        return {...state, itineraries: newItinerarySet, itineraryChanging:true};
      }
      case 'ITINERARY_CHANGED':{
        return{...state, itineraryChanging:false}
      }
      case "ITINERARY_DELETE": {
        const newItineraries = Object.assign([],{...state.itineraries});
        const index= state.itineraries.findIndex(itinerary => {return itinerary.id == action.id})
        newItineraries.splice(index, 1)
        return {...state, itineraries: newItineraries};
      }
      default:
        return state;
    }
  }
  
export default itineraryReducer;