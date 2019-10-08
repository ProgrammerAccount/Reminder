import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerListComponent } from './timer-list/timer-list.component';
import { TimerWidgetComponent } from './timer-widget/timer-widget.component';
import { TimerComponent } from './timer/timer.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { OwlDateTimeModule, OwlNativeDateTimeModule, DateTimeAdapter, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { TimerDailyComponent } from './timer-daily/timer-daily.component';
import { TimerService } from './timer.service';
import { OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import { OwlMomentDateTimeModule, MomentDateTimeAdapter } from 'ng-pick-datetime-moment';


export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'HH:mm',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [TimerListComponent, TimerWidgetComponent, TimerComponent, TimerDailyComponent],
  imports: [
    CommonModule,
    MatIconModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,MatButtonModule

  ],
  exports:[
    TimerListComponent,
    TimerWidgetComponent
  ],
  providers:[
    TimerService,
    {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
  ]
})
export class TimerModule { }
