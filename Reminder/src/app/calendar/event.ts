export class CalendarEvent {
    constructor(public id: number, public title: string, public date: Date, public time: Date, public id_calendar: number, public color: string,public reminders:Array<Notyfication>) { }
}
export class Notyfication{
    constructor(public id_event:number, public time_before_in_milisec: number,public id=0 ){}
}