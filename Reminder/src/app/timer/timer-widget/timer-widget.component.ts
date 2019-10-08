import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Timer } from '../timer';
import { URL } from '../../ApiUrls';
import { TimerService } from '../timer.service';
import { APIService } from 'src/app/api.service';

@Component({
  selector: 'app-timer-widget',
  templateUrl: './timer-widget.component.html',
  styleUrls: ['./timer-widget.component.css'],
  providers: [APIService]
})
@Injectable()
export class TimerWidgetComponent implements OnInit {
  @Input() taskTitle: string;
  @Input() taskID: number;
  constructor(private apiService: APIService, private SubTimerM: TimerService) {
  }

  Start() {
    this.SubTimerM.Add(this.taskID);
    this.SubTimerM.RunningTimer = new Timer(null, new Date(), null, this.taskID, this.taskTitle);
  }
  Stop(): any {
    // Find running Timer
    const subTimer = this.SubTimerM.objects.find((el) => {
      if (el.stop === null) {
        return el;
      }
    });

    let subTimerID;
    const timer_stop = new Date();
    const subtimerindex = this.SubTimerM.objects.indexOf(subTimer);
    if (subtimerindex !== -1) {
      this.SubTimerM.objects[subtimerindex].stop = timer_stop;
      subTimerID = subTimer.id;
    }
    else {
      subTimerID = this.SubTimerM.RunningTimer.id; // DateBase return running timer id instead of true
    }
    this.apiService.updateObjects(URL.API_SUB_TIMER, { id: subTimerID, stop: timer_stop })
      .subscribe((data) => {
        this.SubTimerM.RunningTimer = null;
        return data;
      });

  }

  /*updateLocalTimer(): any {
    this.local_timer++;
    this.local_s = this.local_timer % 60;
    this.local_m = Math.floor(this.local_timer / 60);
    this.local_h = Math.floor(this.local_timer / 3600);
    console.log(this.local_timer);
  }*/

  ngOnInit() {
    this.SubTimerM.getRunningTimer(this.taskID);
    // TODO: Create Connection Pool in python

  }
}
