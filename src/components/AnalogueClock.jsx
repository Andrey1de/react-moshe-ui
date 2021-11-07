
import Button from '@restart/ui/esm/Button';
import { useEffect, useRef , useState} from 'react';
import './AnalogueClock.css';
import { alarmEvent$ } from '../services/time.service';
//import { Subject } from "rxjs";

export default   function AnalogueClock() {
    const secondHandEl = useRef(null);
    const minsHandEl = useRef(null);
    const hourHandEl = useRef(null);
    const [_alarmName, _setAlarmName] = useState('NOW');
    const [_ampm, _setAmPm] = useState('');



    useEffect(() => {
        console.log('clock render!');
       // debugger;
       // const alarmEvent$ = new Subject();
        const event$ = alarmEvent$();
        const subscrAlarm$ = event$.subscribe(
            alarm => {
                setAlarm(alarm);
            }
        )
            return () => {
            subscrAlarm$.unsubscribe();
            console.log('clock unmounting...');
        }
    })
    function setNow() {
        const now = new Date();

        setDate(now.getHours(), now.getMinutes(), now.getSeconds());
        _setAlarmName('NOW');
      
    }
    function setAlarm(alarm) {
        if (!alarm?.time) return;
            
        const arr = alarm.time.split(':');
        if (arr.length === 3) {
            setDate(+arr[0], +arr[1], +arr[2]);
            _setAlarmName(alarm.alarmName)
        }
  
    }

    function setDate(hour, mins, seconds) {
       // debugger;
        //const now = new Date();

        //const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        secondHandEl.current.style.transform = `rotate(${secondsDegrees}deg)`;

        //const mins = now.getMinutes();
        const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
        minsHandEl.current.style.transform = `rotate(${minsDegrees}deg)`;

        //const hour = now.getHours();
        _setAmPm((hour >= 12) ? 'PM' : 'AM');
        const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
        hourHandEl.current.style.transform = `rotate(${hourDegrees}deg)`;
    }
    return (
        <>
            <h3 className="ampm">{_ampm + '  :  ' + _alarmName }</h3>
            
             <div className="clock">
                <div className="outer-clock-face">
                <div className="marking marking-one"></div>
                <div className="marking marking-two"></div>
                <div className="marking marking-three"></div>
                <div className="marking marking-four"></div>
                <div className="inner-clock-face">
                    <div className="hand hour-hand" ref={hourHandEl }></div>
                    <div className="hand min-hand" ref={minsHandEl }></div>
                    <div className="hand second-hand" ref={secondHandEl }></div>
                </div>
                </div>
            </div>
            <Button variant="danger" onClick={ setNow}>NOW</Button>

        </>
       
        
        
    );
}