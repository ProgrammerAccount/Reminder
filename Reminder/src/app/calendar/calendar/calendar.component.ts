import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { EventService } from '../event.service';
import { CalendarService } from '../calendar.service';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { Goal } from 'src/app/goals/goal';
import { CalendarEvent } from '../event';
export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'llll',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],

  providers: [

    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pl' },
  ]

})
export class CalendarComponent implements AfterViewInit {
  public Events:Array<CalendarEvent>;
  public Calendars = new Array<Goal>();
  public eventToDisplay = new Array<CalendarEvent>();
  private DateString: String; //DateString jest nagłówkiem kalendarza na przykład: November 2019
  private DAY_IN_MILSEC = 86400000;
  private selectedDay: DayComponent;
  private DisplayMonth = new Date().getMonth(); // Zmnienna przechowująca aktualnie wyswietlany miesiac
  private DisplayYear = new Date().getFullYear(); // Zmnienna przechowująca aktualnie wyswietlany rok
  public SelectedCalendar: Goal; // Zmienna przeczowujaca aktualną  kalendarz ktory jest wyswietlany 
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
  private month = []; //Tablica [6][7] przechowująca Komponent Day
  constructor(public eventService: EventService, public calendarService: CalendarService) {
    this.LoadCalendars();
    this.GetCalendarHeader();
    const firstDayOfMonth = new Date(this.DisplayYear, this.DisplayMonth, 1); // }}
    let dayOfWeek = firstDayOfMonth.getDay(); // }
    if (dayOfWeek === 0) {                        // Sprawdzanie który dzein tygodnia to pierwszy dzien miesiaca        
      dayOfWeek = 7;                                                              // Wyliczanie Pierwszego dnia w tablicy month 
    }                                        // } 
    const startDate =
      firstDayOfMonth.getTime() - (dayOfWeek - 1) * this.DAY_IN_MILSEC;   // }} Wyliczanie Pierwszego dnia w talicy (Pierwszy dzien miesiaca) - (Dzien tygodnia(Pierwszy miesiaca)) Ponieważ rozmiar tablicy to 6*7 co daje 42 dni inaczej 6 tygodni Trzeba dobrać po kinkanascie dni tak żeby każdy znalazł sie w odpowiedniej kolumnie Pod swoja nazwą dnia
    this.GenerateCalendarDate(new Date(this.GetFirstDateInCalendarPage()));
  }
  DefaultSelectedDay(day) {
    let today = new Date()
    if (day.date.getFullYear() == today.getFullYear() && day.date.getMonth() == today.getMonth() && day.date.getDate() == today.getDate()) {
      this.SelectDay(day);


    }
  }
  EventsToDisplay(event) {
    this.eventToDisplay = event;
  }
  ngAfterViewInit() {
  }

  GetDefaultCalendar(): any { // Return True if SelectedCalendar is !== undefined
    let ID_LastUsedCalendarOnThisDeviceString = localStorage.getItem("ID_LastUsedCalendarOnThisDevice");
    let ID_lastUsedCalendar = (ID_LastUsedCalendarOnThisDeviceString !== null) ? parseInt(ID_LastUsedCalendarOnThisDeviceString, 10) : undefined

    if (ID_lastUsedCalendar != undefined)
      this.Calendars.find((goal) => { if (goal.id == ID_lastUsedCalendar) this.SelectedCalendar = goal });
    else this.SelectedCalendar = this.Calendars[0];

    if (this.SelectedCalendar !== undefined && this.SelectedCalendar.id !== undefined)
      return this.SelectedCalendar
    return false;

  }
  LoadCalendars() {
    this.calendarService.Get().subscribe(
      (res) => { this.Calendars = res },
      (err) => { console.log(`Error:${err}`) },
      () => { this.CalendarsLoadingComplet() });
  }
  CalendarsLoadingComplet() {
    if (this.GetDefaultCalendar())
      this.LoadEvents(this.SelectedCalendar.id);
  }
  LoadEvents(id) { //Pobiera wydarzenia dla wybranego kalendarza
    this.eventService.Get(`/${id}`).subscribe(
      (res) => { this.Events = res },
      (err) => { console.log(`Error:${err}`) },
      () => { this.EventsLoadingComplet() });

  }
  EventsLoadingComplet() {
    
    this.selectedDay.filterEventByDate();

  }
  GetNextCalendar() { // Po nacisnieciu strzałki w prawo generuje następny kalendarz z tablicy

    let indexOfSelectedCalendarInObjectArrays = this.Calendars.indexOf(this.SelectedCalendar)
    if (indexOfSelectedCalendarInObjectArrays != -1)
      if (indexOfSelectedCalendarInObjectArrays + 1 < this.Calendars.length) {
        this.SelectedCalendar = this.Calendars[indexOfSelectedCalendarInObjectArrays + 1]
      }
      else {
        this.SelectedCalendar = this.Calendars[0];
      }
    if (this.SelectedCalendar.id !== undefined)
      this.LoadEvents(this.SelectedCalendar.id);

  }
  GetForwardCalendar() {  // Po nacisnieciu strzałki w lewo generuje poprzedni kalendarz z tablicy
    let indexOfSelectedCalendarInObjectArrays = this.Calendars.indexOf(this.SelectedCalendar)
    if (indexOfSelectedCalendarInObjectArrays != -1)
      if (indexOfSelectedCalendarInObjectArrays - 1 > 0) {
        this.SelectedCalendar = this.Calendars[indexOfSelectedCalendarInObjectArrays - 1]
      }
      else {
        this.SelectedCalendar = this.Calendars[this.Calendars.length - 1];

      }
    if (this.SelectedCalendar.id !== undefined)
      this.LoadEvents(this.SelectedCalendar.id);
    this.SelectedCalendar = this.SelectedCalendar;
  }

  GetCalendarHeader() { // Generuje nagłówek kalendarza November 2019
    return `${this.MonthName[this.DisplayMonth]} ${
      this.DisplayYear
      }`;
  }
  GenerateCalendarDate(startDate:Date) { //Przypisuje numery dni miesiąca do miejsc w tablicy month  w generowanym kalendarzu
    this.month = [];

    startDate = new Date(startDate)
    for (let i = 0; i < 6; i++) {
      this.month.push(new Array());
      for (let j = 0; j < 7; j++) {
        this.month[i].push(startDate);
        startDate.setDate(startDate.getDate() + 1);
        startDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate());

      }
    }

  }

  ResetInput(input: HTMLInputElement) {

    input.value = '';
  }
  SelectDay(day) { // Kiedy urzytkownik nacisnie na numer dnia funkcja przypisuje zmienna typu DayComponent do selectedDay i pilnuje by wybrany był tylko jeden dzien 
    // Selected day can be only one
    if (this.selectedDay !== undefined) {
      this.selectedDay.isSelected = false;
    }
    this.selectedDay = day;
    this.selectedDay.isSelected = true;
  }

  ChangeMonth(monthNumber) { //Nazdoruje zmiane miesiaca przez usera i sprawdza czy nie trzeba zmienić roku po zmianie miesiaca
    this.DisplayMonth = monthNumber;
    if (this.DisplayMonth > 11) {
      this.DisplayMonth = this.DisplayMonth - 12;
      this.DisplayYear++;
      
    }
    if (this.DisplayMonth < 0) {
      this.DisplayMonth = 12 + this.DisplayMonth;
      this.DisplayYear--;
    }
    //TODO Create function the same code is in constructor
    this.GenerateCalendarDate(new Date(this.GetFirstDateInCalendarPage()));
    this.GetCalendarHeader();
  }
  AddEvent(title: HTMLInputElement, time: HTMLInputElement) {
    let date = new Date(this.selectedDay.date);
    date.setTime(date.getTime() + new Date(time.valueAsDate).getTime());
    this.eventService.Add(title.value, date, this.SelectedCalendar.id,2).subscribe(
      (res) => {
        this.Events.push(res);
        this.eventToDisplay.push(res)
      },
      (err) => { console.error },
      () => { this.EventsLoadingComplet() });
  }

  GetFirstDateInCalendarPage() {
    const firstDayOfMonth = new Date(this.DisplayYear, this.DisplayMonth, 1); // }}
    let dayOfWeek = firstDayOfMonth.getDay(); // }
    if (dayOfWeek === 0) {                        // Sprawdzanie który dzein tygodnia to pierwszy dzien miesiaca        
      dayOfWeek = 7;                                                              // Wyliczanie Pierwszego dnia w tablicy month 
    }                                        // } 

    return firstDayOfMonth.getTime() - (dayOfWeek - 1) * this.DAY_IN_MILSEC;  // }} Wyliczanie Pierwszego dnia w talicy (Pierwszy dzien miesiaca) - (Dzien tygodnia(Pierwszy miesiaca)) Ponieważ rozmiar tablicy to 6*7 co daje 42 dni inaczej 6 tygodni Trzeba dobrać po kinkanascie dni tak żeby każdy znalazł sie w odpowiedniej kolumnie Pod swoja nazwą dnia

  }
  ngOnDestroy() {
    localStorage.setItem("ID_LastUsedCalendarOnThisDevice", this.SelectedCalendar.id.toString())
  }
}

