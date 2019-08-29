const INITIAL_STATE = {
    groups: [{}],
    groupAdding: false,
    selectedGroup: {},
    selectGroupChanged: false,
    groupChanging: false
    
};
function groupReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GROUPS_GET': {
        return {...state, groups: action.payload};
      }
      case 'GROUP_ADD': {
        return {...state, groups: [action.payload,...state.groups], groupAdding: true};
      }
      case 'GROUP_ADDED': {
        return {...state, groupAdding: false}
      }
      case 'GROUP_SELECT': {
        let newSelected=(action.payload);
        console.log(newSelected)
        return {...state, selectedGroup: newSelected, selectGroupChanged: true};
      }
      case 'GROUP_SELECT_CHANGED':{
        return {...state, selectGroupChanged: false}
      }
      case 'EDIT_GROUP': {
        const index= state.groups.findIndex(group => {return group.id == state.selectedGroup.id})
        const newGroupSet = state.groups;
        newGroupSet[index]= action.payload;
        console.log(newGroupSet)
        return {...state, groups: newGroupSet, groupChanging:true};
      }
      case 'GROUP_CHANGED':{
        return{...state, groupChanging:false}
      }
      case "GROUP_DELETE": {
        const newGroups = Object.assign([],{...state.groups});
        const index= state.groups.findIndex(group => {return group.id == action.id})
        newGroups.splice(index, 1)
        return {...state, groups: newGroups, groupDeleting: true};
      }
      default:
        return state;
    }
  }
  
export default groupReducer;