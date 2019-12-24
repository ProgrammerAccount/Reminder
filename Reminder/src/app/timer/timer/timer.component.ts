import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../timer.service';
import { Timer } from '../timer';
import {  OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS, DateTimeAdapter } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'HH:mm',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers:[
    TimerService,
    {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'pl'},
  ]
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
