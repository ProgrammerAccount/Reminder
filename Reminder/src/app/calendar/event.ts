export class CalendarEvent {
    constructor(public id: number, public title: string, public date: Date, public time: Date, public id_calendar: number, public color: string,public reminders:Array<Object>) { }
}