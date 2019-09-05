const INITIAL_STATE = {
    notifications: [{}],
    notificationsGetting: false,
    notificationSending: false,
    selectedNotification: {},
    selectNotificationChanged: false,
    notificationChanging: false
};
function notificationReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'NOTIFICATIONS_GET': {
        return {...state, notifications: action.payload, notificationsGetting: true};
      }
      case "NOTIFICATIONS_GETTING":{
        return {...state, notificationsGetting: false}
      }
      case 'NOTIFICATION_SEND': {
        return {...state, notifications: [action.payload,...state.notifications], notificationSending: true};
      }
      case 'NOTIFICATION_SENT': {
        return {...state, notificationSending: false}
      }
      case 'NOTIFICATION_SELECT': {
        return {...state, selectedNotification: action.payload, selectNotificationChanged: true};
      }
      case 'NOTIFICATION_SELECT_CHANGED':{
        return {...state, selectNotificationChanged: false}
      }
      case 'EDIT_NOTIFICATION': {
        const index= state.notifications.findIndex(notification => {return notification.id == state.selectedNotification.id})
        const newNotificationSet = state.notifications;
        newNotificationSet[index]= action.payload;
        console.log(newNotificationSet);
        return {...state, notifications: newNotificationSet, notificationChanging:true};
      }
      case 'NOTIFICATION_CHANGED':{
        return{...state, notificationChanging:false}
      }
      case "NOTIFICATION_DELETE": {
        const newNotifications = Object.assign([],{...state.notifications});
        const index= state.notifications.findIndex(notification => {return notification.id == action.id})
        newNotifications.splice(index, 1)
        return {...state, notifications: newNotifications, notificationDeleting: true};
      }
      default:
        return state;
    }
  }
  
export default notificationReducer;