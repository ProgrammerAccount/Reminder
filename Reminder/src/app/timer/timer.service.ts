import { Injectable } from '@angular/core';
import { AbstractService } from '../abscract.service';
import { APIService } from '../api.service';
import { URL } from '../ApiUrls'
import { Timer } from './timer'
@Injectable({
  providedIn: 'root'
})
export class TimerService extends AbstractService {

  subTimers: Timer[][];
  public RunningTimer: Timer;
  constructor(private apiService: APIService) {
    super(apiService, URL.API_SUB_TIMER);
    this.RunningTimer = null;

  }
  Sort(): void {
  }

  Add(task_ID): any {
    this.objects.map((el) => {
      if (el.stop === null) {
        el.stop = Date.now();
      }
    });
    if (task_ID !== undefined) {
      this.apiService.addObjects(URL.API_SUB_TIMER, { 'start': new Date(), 'id_task': task_ID }).subscribe((data) => {
        this.objects.push(data);
      });
    }
  }
  Edit(timer: Timer){
    this.apiService.updateObjects(URL.API_SUB_TIMER,{'start': new Date(timer.start) , 'stop':new Date(timer.stop), 'id': timer.id}).subscribe((data)=>{

    });
  }
  getRunningTimer(task_ID) {
    this.apiService.getObjects(URL.API_SUB_TIMER + '/' + task_ID).subscribe((data) => {
      if (data.id !== undefined) {
        this.RunningTimer = data;
      }

    });
  }
}
