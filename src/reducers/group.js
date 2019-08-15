const INITIAL_STATE = {
    groups: [{}],
    selectedGroup: {},
    groupsListloading: false,
    changed: false,
    listLoading: false,
    userChanged: false,
    userAdded: false,
};
function groupReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GROUPS_GET': {
        return {...state, groups: action.payload};
      }
      case 'GROUP_SELECT': {
        let newSelected=(action.payload);
        console.log(newSelected)
        return {...state, selected: newSelected, groupListLoading: false, changed: true};
      }
      case 'RESET_CHANGED':{
        return {...state, changed: false}
      }
      case 'CHANGE_LOADING':{
        return {...state, loading: true}
      }
      case 'GROUP_RESET_CHANGED':{
        return {...state, userChanged: false}
      }
      case 'GROUP_CHANGE_LOADING':{
        return {...state, listLoading: true}
      }
      case 'GROUP_ADD':{
        return {...state, users: [action.payload,...state.users], userAdded: true, userAddedLoading: true};
      }
      case 'GROUP_ADDED':{
        return {...state, userAdded: false}
      }
      case 'GROUP_SET': {
        const index= state.users.findIndex(user => {return user.id == state.selected.id})
        const newUserSet = state.users;
        newUserSet[index]= action.payload;
        return {...state, users: newUserSet, userChanged:true};
      }
      case "GROUP_DELETE": {
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
  
export default groupReducer;