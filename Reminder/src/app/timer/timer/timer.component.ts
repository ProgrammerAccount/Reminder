import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../timer.service';
import { Timer } from '../timer';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Input() subTimer: Timer;
  start: Date;
  stop: Date;
  constructor(private subTimerService: TimerService) {

  }

  ngOnInit() {

    this.start = new Date(this.subTimer.start);
    this.stop = new Date(this.subTimer.stop);

  }
  StopDataChange() {

    this.subTimer.stop = this.stop;
    this.subTimerService.Edit(this.subTimer);


  }
  StartDataChange() {
    this.subTimer.start = this.start;

    this.subTimerService.Edit(this.subTimer);


  }
  DataChange(el: HTMLInputElement) {
    this.subTimer.stop = new Date(el.value);

  }
}
