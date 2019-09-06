const INITIAL_STATE = {
    about: {},
    aboutGetting: false,
    aboutChanging: false
};
function aboutReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'ABOUT_GET': {
        return {...state, about: action.payload, aboutGetting: true};
      }
      case "ABOUT_RECIEVED": {
        return {...state, aboutGetting: false}
      }
      case 'EDIT_ABOUT': {
        return {...state, about: action.payload, aboutChanging: true};
      }
      case 'ABOUT_CHANGED':{
        return{...state, aboutChanging:false}
      }
      default:
        return state;
    }
  }
  
export default aboutReducer;