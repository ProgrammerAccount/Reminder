import { Component, OnInit } from '@angular/core';
import { Timer } from '../timer';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.css']
})
export class TimerListComponent implements OnInit {
  subTimers: Timer[][];
  Timers: Array<any>;
  constructor(private TM: TimerService) {
    this.TM.Get('/TaskTitle').subscribe((res) => { this.Timers = res }, (err) => console.error, () => this.groupSubTimersByDay(this.Timers));
  }

  groupSubTimersByDay(Timers: Array<Timer>) {
    this.subTimers = undefined;
    Timers.map(
      (el) => {
        if (this.subTimers === undefined) {
          this.subTimers = new Array();
        }
        let elDate;
        elDate = new Date(new Date(el.start).getFullYear(), new Date(el.start).getMonth(), new Date(el.start).getDate()).toISOString().substring(0, 10);
        if (elDate in this.subTimers) {
          this.subTimers[elDate].push(el);
        }
        else {
          this.subTimers.push(elDate);
          this.subTimers[elDate] = new Array();
          this.subTimers[elDate].push(el);
        }
      }
    );
    return this.subTimers;
  }

  ngOnInit() {


  }

}
