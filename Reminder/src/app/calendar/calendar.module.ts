import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from './day/day.component';
import { EventComponent } from './event/event.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule, DateTimeAdapter, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';


export const MY_MOMENT_FORMATS = {
  parseInput: 'dd, L, LT',
  fullPickerInput: 'llll',
  datePickerInput: 'dd, L, LT',
  monthYearLabel: 'MMMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [DayComponent, EventComponent, CalendarComponent,],
  imports: [
    CommonModule, FormsModule, OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [
    CalendarComponent
  ],
  providers:[
    
    {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'pl'},
  ]
})
export class CalendarModule { }
