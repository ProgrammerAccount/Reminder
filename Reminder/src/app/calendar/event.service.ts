import { Injectable } from '@angular/core';
import { AbstractService } from '../abscract.service';
import { APIService } from '../api.service';
import { URL } from '../ApiUrls'
import { range } from 'rxjs';
import { Notyfication } from './event';
@Injectable({
  providedIn: 'root'
})
export class EventService extends AbstractService {

  Sort(): void {
    this.GetNotyfication();
  }

  constructor(connectionAPI: APIService) {
    super(connectionAPI, URL.API_EVENT);
  }
  Get(addtionalAdressParametrs?: string) {
    let url = this.URL;
    if (addtionalAdressParametrs !== undefined) {
      url = url + addtionalAdressParametrs;
    }
    this.connectionAPI.getObjects(url).subscribe(res => {
      this.objects = res;

      this.Sort();
    },
      console.error
    );
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

  Add(title: string, date: Date, time: string, id_calendar: number) { /* Wysyła zaoytanie typu POST do zewnetrznego API w formie:
    JSON{
      color: "#fff"
      date: "2019-11-05T23:00:00"
      id: 1
      id_calendar: 1
      time: "23:53"
      title: "title"
    }*/
    this.connectionAPI
      .addObjects(URL.API_EVENT, {
        title: title,
        date: date,
        time: time,
        id_calendar: id_calendar,
        color: '#fff'
      })
      .subscribe(res => {
        this.objects.push(res);
      });
  }
}