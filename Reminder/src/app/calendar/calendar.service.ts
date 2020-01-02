import { Injectable } from '@angular/core';
import { AbstractService } from '../abscract.service';
import { APIService } from '../api.service';
import { URL } from '../ApiUrls'
import { Calendar } from './calendar';
import { Goal } from '../goals/goal';
@Injectable({
  providedIn: 'root'
})
export class CalendarService extends AbstractService {

  Sort(): void { }
  private ID_lastUsedCalendar: number;
  //public SelectedCalendar: Goal;
  constructor(connectionAPI: APIService) {
    super(connectionAPI, URL.API_GOAL);

    // this.SelectedCalendar = this.GetSelectedCalendar();
  }
  Add(title: string) {
    return this.connectionAPI
      .addObjects(URL.API_GOAL, {
        name: title,
      })

  }


}