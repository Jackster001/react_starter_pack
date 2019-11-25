const INITIAL_STATE = {
    lostNotifications: [{}],
    gettingNotifications: false
};
function lostReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'LOST_GET': {
        return {...state, lostNotifications: action.payload , gettingNotifications: true};
      }
      case 'GETTING_NOTIFICATIONS':{
        return {...state, gettingNotifications: false}
      }
      case "LOST_DELETE": {
        const newlostNotifications = Object.assign([],{...state.lostNotifications});
        const index= state.lostNotifications.findIndex(lostNotification => {return lostNotification.id === action.id})
        newlostNotifications.splice(index, 1)
        return {...state, lostNotifications: newlostNotifications};
      }
      default:
        return state;
    }
  }
  
export default lostReducer;