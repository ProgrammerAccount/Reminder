import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { DayComponent } from '../day/day.component';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private DateString: String;
  private DAY_IN_MILSEC = 86400000;
  private selectedDay: DayComponent;
  private DisplayMonth = new Date().getMonth();
  private DisplayYear = new Date().getFullYear();

  private MonthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  private month = [];
  constructor(public calendarServ: CalendarService) {
    this.DateStringUpdate();
    const firstDayOfMonth = new Date(this.DisplayYear, this.DisplayMonth, 1);
    let dayOfWeek = firstDayOfMonth.getDay();
    if (dayOfWeek === 0) {
      dayOfWeek = 7;
    }
    const startDate =
      firstDayOfMonth.getTime() - (dayOfWeek - 1) * this.DAY_IN_MILSEC;
    this.GenerateCalendarDate(startDate);
  }
  AddEventsToDate() {
    if (
      this.calendarServ.objects !== undefined &&
      this.calendarServ.objects.length !== 0
    ) {
      const objects = Array.from(
        this.calendarServ.objects.sort((a, b) => a.date - b.date)
      );
      let index = 0;
      console.log(objects.length);
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          // tslint:disable-next-line: max-line-length
          if (
            new Date(this.month[i][j].date).toISOString().substring(0, 10) ===
            new Date(objects[index].date).toISOString().substring(0, 10)
          ) {
            this.month[i][j].event = objects[index];
            if (index < objects.length - 1) {
              index++;
            }
          }
        }
      }
      console.log(this.month);
      return true;
    }
    return false;
  }
  DateStringUpdate() {
    this.DateString = `${this.MonthName[this.DisplayMonth]} ${
      this.DisplayYear
    }`;
  }
  GenerateCalendarDate(startDate) {
    this.month = [];
    for (let i = 0; i < 6; i++) {
      this.month.push(new Array());
      for (let j = 0; j < 7; j++) {
        this.month[i].push(
          new Object({ date: new Date(startDate), event: undefined })
        );
        startDate += this.DAY_IN_MILSEC;
      }
    }
  }

  ResetInput(input:HTMLInputElement){
    input.value='';
  }
  SelectDay(day) {
    // Selected day can be only one
    if (this.selectedDay !== undefined) {
      this.selectedDay.isSelected = false;
    }
    this.selectedDay = day;
    this.selectedDay.isSelected = true;
  }

  ngOnInit() {}
  ChangeMonth(monthNumber) {
    this.DisplayMonth = monthNumber;
    if (this.DisplayMonth > 11) {
      this.DisplayMonth = this.DisplayMonth - 11;
      this.DisplayYear++;
    }
    if (this.DisplayMonth < 0) {
      this.DisplayMonth = 11 + this.DisplayMonth;
      this.DisplayYear--;
    }
    const firstDayOfMonth = new Date(this.DisplayYear, this.DisplayMonth, 1);
    let dayOfWeek = firstDayOfMonth.getDay();
    if (dayOfWeek === 0) {
      dayOfWeek = 7;
    }
    const startDate =
      firstDayOfMonth.getTime() - (dayOfWeek - 1) * this.DAY_IN_MILSEC;
    this.GenerateCalendarDate(startDate);
    this.DateStringUpdate();
  }
  AddEvent(title: HTMLInputElement, time: HTMLInputElement) {
    this.calendarServ.Add(title.value, new Date(this.selectedDay.date), time.value);
  }
}
