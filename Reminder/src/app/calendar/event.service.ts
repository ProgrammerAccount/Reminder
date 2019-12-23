import { Injectable } from '@angular/core';
import { AbstractService } from '../abscract.service';
import { APIService } from '../api.service';
import { URL } from '../ApiUrls'
import { range } from 'rxjs';
import { Notyfication } from './event';
import { TaskService } from '../todo/task.service';
@Injectable({
  providedIn: 'root'
})
export class EventService extends TaskService {

  Sort(): void {
    this.GetNotyfication();
  }

  constructor(connectionAPI: APIService) {
    super(connectionAPI);
  }
  GetNotyfication() {
    let i = 0;
    this.objects.forEach(element => {
      this.connectionAPI.getObjects(URL.API_EVENT_NOTYFICATION + '/' + element.id).subscribe(notyfications => {
        this.objects[i].reminders = notyfications
        i++;
      });
    });
  }
  RemoveNotyfication(event_id: number, time: number) {
    this.connectionAPI
      .removeObject(URL.API_EVENT_NOTYFICATION + '/' + event_id+ '/' + time).subscribe(res => {

      });
  }
  AddNotyfication(event_id: number, time: number) {
    this.connectionAPI
      .addObjects(URL.API_EVENT_NOTYFICATION + '/' + event_id, {
        "time_before_in_milisec": time, 'id_event': event_id
      }).subscribe(res => {

        this.objects.forEach(element => {
          if (element === event_id) {
            element.reminders.push(res);
          }
        });
      });

  }
  UpdateNotyfication(notyfication:Notyfication)
  {
    this.connectionAPI.updateObjects(URL.API_EVENT_NOTYFICATION,notyfication).subscribe(res =>{})
  }
}