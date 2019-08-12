const INITIAL_STATE = {
  users: [{}],
  selected: {}
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'USERS_GET': {
      return {...state, users: action.payload};
    }
    case 'USERS_SELECT': {
      let newSelected=(action.payload);
      console.log(newSelected)
      return {...state, selected: newSelected};
    }
    case 'USER_ADD':{
      return {...state, user: action.payload};
    }
    case 'USER_SET': {
      const index= state.users.findIndex(user => {return user.id == state.selected.id})
      const newUserSet = state.users;
      newUserSet[index]= action.payload;
      return {...state, users: newUserSet};
    }
    case "USER_DELETE": {
      const newUsers = Object.assign([],{...state.users});
      console.log(newUsers)
      const index= state.users.findIndex(user => {return user.id == action.id})
      newUsers.splice(index, 1)
      console.log(index);
      console.log(newUsers)
      return {...state, users: newUsers};
    }
    default:
      return state;
  }
}

export default userReducer;