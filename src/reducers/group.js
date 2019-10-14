const INITIAL_STATE = {
    groups: [{}],
    groupRecieving: false,
    groupAdding: false,
    selectedGroup: {},
    selectGroupChanged: false,
    groupChanging: false,
    groupModalSelectProcess: false
    
};
function groupReducer(state = INITIAL_STATE, action){
    switch (action.type) {
      case 'GROUPS_GET': {
        return {...state, groups: action.payload, groupRecieving: true};
      }
      case 'GROUP_GETTING':{
        return{...state, groupRecieving: false}
      }
      case 'GROUP_ADD': {
        return {...state, groups: [action.payload,...state.groups], groupAdding: true};
      }
      case 'GROUP_ADDED': {
        return {...state, groupAdding: false}
      }
      case 'GROUP_SELECT': {
        let newSelected=action.payload;
        return {...state, selectedGroup: newSelected, selectGroupChanged: true};
      }
      case 'GROUP_SELECT_CHANGED':{
        return {...state, selectGroupChanged: false}
      }
      case 'GROUP_SELECT_FOR_MODAL':{
        let newSelected=action.payload;
        return {...state, selectedGroup: newSelected, groupModalSelecting:true}
      }
      case 'GROUP_MODAL_SELECTING':{
        return{...state, groupModalSelecting:false}
      }
      case 'EDIT_GROUP': {
        const index= state.groups.findIndex(group => {return group.id == state.selectedGroup.id})
        const newGroupSet = state.groups;
        newGroupSet[index]= action.payload;
        console.log(newGroupSet)
        return {...state, groups: newGroupSet, selectedGroup:{}, groupChanging:true};
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