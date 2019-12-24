import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from './day/day.component';
import { EventComponent } from './event/event.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule, DateTimeAdapter, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';




@NgModule({
  declarations: [DayComponent, EventComponent, CalendarComponent],
  imports: [
    CommonModule, FormsModule, OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [
    CalendarComponent
  ],
  providers: [


  ]
})
export class CalendarModule { }
