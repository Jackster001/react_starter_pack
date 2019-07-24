const INITIAL_STATE = {
  users: [{}],
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'USERS_GET': {
      return {...state, users: action.payload};
    }
    case 'USER_SET': {
      return {...state, users: action.payload};
    }
    default:
      return state;
  }
}

export default userReducer;