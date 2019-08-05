const INITIAL_STATE = {
  users: [{}],
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'USERS_GET': {
      return {...state, users: action.payload};
    }
    case 'USER_ADD':{
      return {...state, user: action.payload};
    }
    case 'USER_SET': {
      return {...state, users: action.payload};
    }
    // case "USER_DELETE": {
    //   const userId=action.id
    //   return {
    //     INITIAL_STATE: state.users.filter(users => users.id != userId)
    //   }
    // }
    default:
      return state;
  }
}

export default userReducer;