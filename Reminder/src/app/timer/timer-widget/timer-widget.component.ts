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
    this.Stop(this.SubTimerM.RunningTimer);
    this.SubTimerM.Add(this.taskID).subscribe((res) => {
      this.SubTimerM.RunningTimer = res
    });
  }
  Stop(timer: Timer): any {
    // Find running Timer

    timer.stop = new Date();
    this.apiService.updateObjects(URL.API_SUB_TIMER, { id: timer.id, stop: timer.stop })
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
