import { Injectable } from '@angular/core';
import {Goal} from './goal'
import {URL} from '../ApiUrls'
import { Subscription } from 'rxjs';
import { APIService } from '../api.service';
import { AbstractService } from '../abscract.service';
@Injectable({
  providedIn: 'root'
})
export class GoalService extends AbstractService {

  TodayDate: string;
  Sort(): void {
  }
  constructor(protected connectionAPI: APIService) {
      super(connectionAPI, URL.API_GOAL);
  }
  AddGoal(title: string) {
      return this.connectionAPI.addObjects(URL.API_GOAL, { 'title': title, 'id_user': 1 });
  }




}
