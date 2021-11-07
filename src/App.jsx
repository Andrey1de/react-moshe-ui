//import 'bootstrap/dist/css/bootstrap.css'
//import logo from './logo.svg';
//import React, { Component } from 'react';
import { useReducer,useState , useEffect} from 'react';
import './App.css';
import TimeForm from './components/TimeForm';
import AnalogueClock from './components/AnalogueClock';
//import { Alarm } from './reducers/alarm';

import { alarmReducer } from './reducers/alarm.reducer';
import Button  from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Row, Col } from 'react-bootstrap';
//import { Form,Row,Col}  from 'react-bootstrap';
import { sendAlarm$ } from './services/time.service';

const axios = require('axios');
const _url = 'http://localhost:4100/alarms';
const _urlRead = _url + '/read';
//const _urlSave = _url + '/save';

function App(props) {
  
  const [alarmsArray, dispatch] = useReducer(alarmReducer, []);
  const [_selectedAlarm, _selectAlarm] = useState(null);
  const [_alarmsValid, _setlArmsValid] = useState(0);
 
 
  useEffect(() => {
    //  console.log('app render!');
    if (_alarmsValid === 0) {
      _setlArmsValid(1);
      axios.get(_urlRead)
        .then(payload => {
          
          setAlarmsArray(payload.data);
        })
        .catch(e => {
          console.log(e);
          alert('Server:' + _urlRead + ' isn\'t assesible\n please activate server NodejsExpressMoshe on  localhost:4100');
        });
    }

    // return () => {
    //     if (_alarmsValid === 2) {
    //       _setlArmsValid(1);
    //       debugger;
    //       axios.post(_urlSave, alarmsArray)
    //         .then(payload => { console.log('save OK') })
    //         .catch(e => { console.log(e); });
    //     }
       
    //   }
  }, [alarmsArray, _alarmsValid]);
  
  function selectAlarm(alarm) {
    if (!!alarm  && _selectedAlarm?.alarmName !== alarm.alarmName) {
      _selectAlarm(alarm);
      sendAlarm$(alarm);
    }
    
  }

  function setAlarmsArray(alarms) {
    if (Array.isArray(alarms)) {
      const action = {
        type: "setAlarmsArray",
        payload: { alarms: alarms }
      };
      dispatch(action);
      console.log('Dispatch activateAlarm' + JSON.stringify(action));
     
    }
  }
  function setAlarmChecked(e, alarm) {
     
    const isActive = e.currentTarget.checked;
    const action = {
      type: "activateAlarm",
      payload: { alarm: alarm, isActive: isActive }
    };
    dispatch(action);
  
    console.log('Dispatch activateAlarm' + JSON.stringify(action));
   }
  function insertAlarm(alarm) {
    
    const action = {
      type: "insertAlarm",
      payload: { alarm: alarm }
    };
    dispatch(action);
    console.log('Dispatch insertAlarm' + JSON.stringify(action));
  }

 
  function removeAlarm(alarm) {
   //_setlArmsValid(2); 
    const action = {
      type: "removeAlarm",
      payload: { alarm: alarm }
    };
    dispatch(action);

    console.log('Dispatch removeAlarm' + JSON.stringify(action));

  }

  function renderTableData() {
    return alarmsArray.map((alarm, index) => {
      let isActive = alarm.active;
      return (
        <tr key={index} onClick={(e)=>selectAlarm(alarm)}>
          <td>{alarm.alarmName}</td>
          <td>{alarm.time}</td>
          <td >
            <div className={ `form-check form-switch`}>
              <input
                  className={ `form-check-input`}
                  type="checkbox"
                  value={'1'}
                  checked={isActive}
                  onChange={(e) => { setAlarmChecked(e,alarm) }}
                />
            </div>
         </td>
          <td>
            <Button variant="danger"
              onClick={(e)=>removeAlarm(alarm)}>
              מחק
            </Button>
          </td>
        </tr>
      )
    });
  }
  // useEffects (){ }
  return (
    <div className="App">
      <Row xs={12} className="wieves">
        <Col xs={6} className="wiev-left">
          <div className="App-header">
            <TimeForm addAlarm={ insertAlarm} className="TimeForm"/>
          </div>
 
          <Table id='alerts' striped bordered hover className="App-table">
              <thead>
                <tr>
                  <th>Alarm</th>
                  <th>Time</th>
                  <th>Active</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {renderTableData()}
              </tbody>
            </Table>
         
        </Col>
        <Col xs={6} className="wiev-rignt">
          <AnalogueClock/>
        </Col>

      </Row>
    </div>
  );
}

export default App;
