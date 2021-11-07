//import { Alarm } from './alarm.actions';
//import { AlarmActions }  from './alarm.actions';
import { sendAlarm$ } from '../services/time.service';
const _url = 'http://localhost:4100/alarms';
const axios = require('axios');
const _urlSave = _url + '/save';
export function saveAlarmArray(_alarms) {
    axios.post(_urlSave, _alarms)
      .then(payload => { console.log('save OK') })
      .catch(e => { console.log(e); });
   
}
export  function alarmReducer(state, action) {
    const _type = action?.type || '';
    const _alarm = action.payload?.alarm;
    
    switch (_type) {
        case "setAlarmsArray"://[ Alarm[]]
            return setAlarmsArray(state,action.payload.alarms) ;
       case "insertAlarm"://[class Alarm]
            return insertAlarm(state, _alarm) ;
        case "removeAlarm"://[string alarmName]
            return removeAlarm(state, _alarm);
       case "activateAlarm"://[string alarmName]
            return activateAlarm(state, _alarm , !!action.payload?.isActive);
        default:
            return state;
    }

}
function setAlarmsArray(alarms, newAlarms) {
    //TBD Merge
    return newAlarms || [];
}

function findAlarmIndex(alarms, alarm) {
   
    if (!alarm) return -200;
    alarm.alarmName = (alarm?.alarmName || '').trim();
    if (alarm.alarmName.length === 0) return -100;
    const arr = alarms.map((e) => e.alarmName);
    const index =  arr.indexOf(alarm.alarmName);
    return index;
}

function insertAlarm(alarms, alarm) {
   let _alarms = Array.isArray(alarms) ? alarms : [];
    const index = findAlarmIndex(_alarms, alarm);
    //debugger;
    if (index >= -1) {
        _alarms = [..._alarms];
        if (index >=  0 && index < _alarms.length) {
            _alarms[index] = alarm;
        } else {
            _alarms.unshift(alarm);
        }
        sendAlarm$(alarm);
        saveAlarmArray(_alarms);

    }
  
    return _alarms ;
}

function removeAlarm(alarms, alarm) {
    let _alarms = Array.isArray(alarms) ? alarms : [];
    const index = findAlarmIndex(_alarms, alarm);
    if (index >= 0 && index < _alarms.length) {
        _alarms = [... _alarms];
        _alarms.splice(index, 1);
        saveAlarmArray(_alarms);

    } 
 
    return _alarms ;
   
}

function activateAlarm(alarms, alarm, isActive) {
  let _alarms = Array.isArray(alarms) ? alarms : [];
  const index = findAlarmIndex(_alarms, alarm);
 
    if (_alarms.length > 0 && index >= 0 && index < _alarms.length){
        sendAlarm$(alarm);
        if (_alarms[index].active !== isActive) {
            _alarms = [..._alarms];
            _alarms[index].active = isActive;
            saveAlarmArray(_alarms);

        }
    }
    return _alarms;
}


