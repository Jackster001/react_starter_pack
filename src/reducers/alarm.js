const INITIAL_STATE = {
    alarms: [{}],
    gettingAlarms: false,
    alarmAdding: false,
    selectedAlarm: {},
    selectAlarmChanged: false,
    groupChanging: false
};
function alarmReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'ALARMS_GET': {
        return {...state, alarms: action.payload};
      }
      case 'GETTING_ALARMS':{
        return {...state, gettingAlarms: true}
      }
      case 'ALARM_ADD': {
        return {...state, alarms: [action.payload,...state.alarms], alarmAdding: true};
      }
      case 'ALARM_ADDED': {
        return {...state, alarmAdding: false}
      }
      case 'ALARM_SELECT': {
        console.log(action.payload)
        return {...state, selectedAlarm: action.payload, selectAlarmChanged: true};
      }
      case 'ALARM_SELECT_CHANGED':{
        return {...state, selectAlarmChanged: false}
      }
      case 'EDIT_ALARM': {
        const index= state.alarms.findIndex(alarm => {return alarm.id == state.selectedAlarm.id})
        const newAlarmSet = state.alarms;
        newAlarmSet[index]= action.payload;
        console.log(newAlarmSet);
        return {...state, alarms: newAlarmSet, alarmChanging:true};
      }
      case 'ALARM_CHANGED':{
        return{...state, alarmChanging:false}
      }
      case "ALARM_DELETE": {
        const newAlarms = Object.assign([],{...state.alarms});
        const index= state.alarms.findIndex(alarm => {return alarm.id == action.id})
        newAlarms.splice(index, 1)
        return {...state, alarms: newAlarms, alarmDeleting: true};
      }
      default:
        return state;
    }
  }
  
export default alarmReducer;