import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerListComponent } from './timer-list/timer-list.component';
import { TimerWidgetComponent } from './timer-widget/timer-widget.component';
import { TimerComponent } from './timer/timer.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { OwlDateTimeModule, OwlNativeDateTimeModule, DateTimeAdapter, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { TimerDailyComponent } from './timer-daily/timer-daily.component';
import { TimerService } from './timer.service';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';



@NgModule({
  declarations: [TimerListComponent, TimerWidgetComponent, TimerComponent, TimerDailyComponent],
  imports: [
    CommonModule,
    MatIconModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,MatButtonModule,

  ],
  exports:[
    TimerListComponent,
    TimerWidgetComponent
  ],


})

export class TimerModule { }
