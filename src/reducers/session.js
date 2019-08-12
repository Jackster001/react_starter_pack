const INITIAL_STATE = {
    authUser: null,
  };
  function sessionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'AUTH_USER_SET': 
        return {...state, authUser: action.payload};
      case "OFF_AUTH_USER_SET":
        return {...state, authUser: action.payload};
      case 'LOGIN_SUCCESS':
        return {...state, authUser: action.payload};
      default:
        return state;
    }
  }
  
  export default sessionReducer;