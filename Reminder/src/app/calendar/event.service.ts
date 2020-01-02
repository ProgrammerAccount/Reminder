import { Injectable } from '@angular/core';
import { APIService } from '../api.service';
import { URL } from '../ApiUrls'
import { Notyfication, CalendarEvent } from './event';
import { TaskService } from '../todo/task.service';
@Injectable({
  providedIn: 'root'
})
export class EventService extends TaskService {
  

  constructor(connectionAPI: APIService) {
    super(connectionAPI);
  }
  GetNotyfication(Events:Array<CalendarEvent>) {
    let i = 0;
    Events.forEach(element => {
      this.connectionAPI.getObjects(URL.API_EVENT_NOTYFICATION + '/' + element.id).subscribe(notyfications => {
        Events[i].reminders = notyfications
        i++;
      });
    });
  }
  RemoveNotyfication(event_id: number, time: number) {
    this.connectionAPI
      .removeObject(URL.API_EVENT_NOTYFICATION + '/' + event_id+ '/' + time).subscribe(() => {

      });
  }
  AddNotyfication(event_id: number, time: number) {
    return this.connectionAPI
      .addObjects(URL.API_EVENT_NOTYFICATION + '/' + event_id, {
        "time_before_in_milisec": time, 'id_event': event_id
      })

  }
  UpdateNotyfication(notyfication:Notyfication)
  {
    this.connectionAPI.updateObjects(URL.API_EVENT_NOTYFICATION,notyfication).subscribe(() =>{})
  }
}