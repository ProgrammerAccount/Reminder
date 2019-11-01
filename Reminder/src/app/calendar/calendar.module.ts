import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from './day/day.component';
import { EventComponent } from './event/event.component';
import { CalendarComponent } from './calendar/calendar.component';
import {FormsModule} from '@angular/forms';




@NgModule({
  declarations: [DayComponent, EventComponent, CalendarComponent],
  imports: [
    CommonModule,FormsModule
  ],
  exports:[
    CalendarComponent
  ]
})
export class CalendarModule { }
