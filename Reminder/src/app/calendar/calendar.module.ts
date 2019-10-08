import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from './day/day.component';
import { EventComponent } from './event/event.component';
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
  declarations: [DayComponent, EventComponent, CalendarComponent],
  imports: [
    CommonModule
  ],
  exports:[
    CalendarComponent
  ]
})
export class CalendarModule { }
