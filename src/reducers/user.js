const INITIAL_STATE = {
  users: [{}],
  gettingUsers: false,
  selected: {},
  loading: false,
  changed: false,
  listLoading: false,
  userChanged: false,
  userAdded: false,
  userDeleting: false,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'USERS_GET': {
      return {...state, users: action.payload, gettingUsers: true};
    }
    case 'GETTING_USERS': {
      return {...state, gettingUsers: false}
    }
    case 'USERS_SELECT': {
      let newSelected=(action.payload);
      return {...state, selected: newSelected, loading: false, changed: true};
    }
    case 'RESET_CHANGED':{
      return {...state, changed: false}
    }
    case 'CHANGE_LOADING':{
      return {...state, loading: true}
    }
    case 'USER_RESET_CHANGED':{
      return {...state, userChanged: false}
    }
    case 'USER_CHANGE_LOADING':{
      return {...state, listLoading: true}
    }
    case 'USER_ADD':{
      return {...state, users: [action.payload,...state.users], userAdded: true, userAddedLoading: true};
    }
    case 'USER_ADDED':{
      return {...state, userAdded: false}
    }
    case 'USER_SET': {
      const index= state.users.findIndex(user => {return user.id == state.selected.id})
      const newUserSet = state.users;
      newUserSet[index]= action.payload;
      return {...state, users: newUserSet, userChanged:true};
    }
    case "USER_DELETE": {
      const newUsers = Object.assign([],{...state.users});
      console.log(newUsers)
      const index= state.users.findIndex(user => {return user.id == action.id})
      newUsers.splice(index, 1)
      console.log(index);
      console.log(newUsers)
      return {...state, users: newUsers, userDeleting: true};
    }
    case "FINISHED_DELETING": {
      return {...state, userDeleting:false}
    }
    default:
      return state;
  }
}

export default userReducer;