import { Injectable } from '@angular/core';
import { AbstractService } from '../abscract.service';
import { APIService } from '../api.service';
import { URL } from '../ApiUrls'
@Injectable({
  providedIn: 'root'
})
export class EventService extends AbstractService {

  Sort(): void {}

  constructor(connectionAPI: APIService) {
    super(connectionAPI, URL.API_EVENT);
    this.Get();
  }
  Add(title: string, date: Date, time: string,id_calendar: number) { /* Wysyła zaoytanie typu POST do zewnetrznego API w formie:
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