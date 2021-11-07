import { Subject } from "rxjs";

const gTimeSubject = new Subject();

export function sendAlarm$(alarm) {
    if (alarm?.time && alarm.time.split(':').length === 3) {
        gTimeSubject.next(alarm);
        
    }
}

export function alarmEvent$() { return gTimeSubject.asObservable();}

