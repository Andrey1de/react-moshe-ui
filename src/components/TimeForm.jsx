//import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';

import { useState/*, useEffects*/ } from 'react';
//import './TimeForm.css';
import Button  from 'react-bootstrap/Button';
//import { Row, Col } from 'bootstrap';
import { Form, Row, Col }  from 'react-bootstrap';
import { Alarm } from '../reducers/alarm';


export default function TimeForm(props) {
  const _dt0 = new Date();
  //Here used useState for every variable to avoid write set functions 
  const [_name, _setName] = useState('');
  const [_sec, _setSec] = useState(_dt0.getSeconds());
  const [_min, _setMin] = useState(_dt0.getMinutes());
  const [_hrs, _setHrs] = useState(_dt0.getHours());

  const handleSubmit = (e) => {
    e.preventDefault();
    const alarm = new Alarm(_name.trim(), getTimeStr(), true);
    if (typeof props.addAlarm === 'function') {
      // debugger;
      props.addAlarm(alarm);
    }
  }
 
  function pad2(num) {
    var s = "000000000" + num;
    return s.substr(s.length-2);
}
  function getTimeStr() {
    const _str = `${pad2(_hrs)}:${pad2(_min)}:${pad2(_sec)}`;
   // debugger;
    return _str;
  };
  
  // useEffects (){ }
  return (
    <Form inline onSubmit={ handleSubmit}>
      <Row>
        <Col xs={4}>
          <Form.Control type="text" required
            placeholder="הכנס שם"
            onChange={(e)=>_setName( e.target.value) }  />
        </Col>
        <Col xs={2}>
          {/* <Form.Label>Hrs</Form.Label> */}
          <Form.Control type="number" min="0" max="23" defaultValue={_hrs}
            onChange={(e)=>_setHrs(e.target.value)} />
        </Col>
        <Col xs={2}>
          
          <Form.Control type="number" min="0" max="59" defaultValue={_min}
            onChange={(e)=>_setMin(e.target.value)} />
        </Col>
        <Col xs={2}>
            <Form.Control type="number" min="0" max="59"
            defaultValue={_sec}
            onChange={(e)=>_setSec(e.target.value)} />
        </Col>
        <Col xs={2}>
            <Button variant="primary" type="submit">הוסף</Button>
        </Col>
      </Row>
    </Form>
  );
}

//  const handleName = (e) => {
//      _setName( e.target.value);
//     console.log('handleName:' + e.target.value);
//   }
//  const handleChangeHours = (e) => {  
//      _setHrs( e.target.value);
//     console.log('handleChangeHours:' + str2(+e.target.value));
//   }
  
//   const handleChangeMin = (e) => { 
//      _setMin(e.target.value);
//      console.log('handleChangeMin:' + str2(+e.target.value));
   
//   }

//   const handleChangeSec = (e) => {
//     _setSec(e.target.value);
//      console.log('handleChangeSec:' +  str2(_sec));
   
//   }