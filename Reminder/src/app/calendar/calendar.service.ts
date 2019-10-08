import { Injectable } from '@angular/core';
import { AbstractService } from '../abscract.service';
import { APIService } from '../api.service';
import { URL } from '../ApiUrls'
@Injectable({
  providedIn: 'root'
})
export class CalendarService extends AbstractService {

  Sort(): void {}

  constructor(connectionAPI: APIService) {
    super(connectionAPI, URL.API_EVENT);
    this.Get();
  }
  Add(title: string, date: Date, time: string) {
    this.connectionAPI
      .addObjects(URL.API_EVENT, {
        title: title,
        date: date,
        time: "15:45",
        color: '#fff'
      })
      .subscribe(res => {
        this.objects.push(res);
      });
  }
}