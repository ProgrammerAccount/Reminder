import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { EventService } from '../event.service';
import { CalendarService } from '../calendar.service';
import { Calendar } from '../calendar';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private DateString: String; //DateString jest nagłówkiem kalendarza na przykład: November 2019
  private DAY_IN_MILSEC = 86400000;
  private selectedDay: DayComponent;
  private DisplayMonth = new Date().getMonth(); // Zmnienna przechowująca aktualnie wyswietlany miesiac
  private DisplayYear = new Date().getFullYear(); // Zmnienna przechowująca aktualnie wyswietlany rok
  public SelectedCalendarName: String; // Zmienna przeczowujaca aktualną nazwe kalendarza np Praca lub Rodzina
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
    this.DateStringUpdate();
    const firstDayOfMonth = new Date(this.DisplayYear, this.DisplayMonth, 1); // }}
    let dayOfWeek = firstDayOfMonth.getDay(); // }
    if (dayOfWeek === 0) {                        // Sprawdzanie który dzein tygodnia to pierwszy dzien miesiaca        
      dayOfWeek = 7;                                                              // Wyliczanie Pierwszego dnia w tablicy month 
    }                                        // } 
    const startDate =
      firstDayOfMonth.getTime() - (dayOfWeek - 1) * this.DAY_IN_MILSEC;   // }} Wyliczanie Pierwszego dnia w talicy (Pierwszy dzien miesiaca) - (Dzien tygodnia(Pierwszy miesiaca)) Ponieważ rozmiar tablicy to 6*7 co daje 42 dni inaczej 6 tygodni Trzeba dobrać po kinkanascie dni tak żeby każdy znalazł sie w odpowiedniej kolumnie Pod swoja nazwą dnia
    this.GenerateCalendarDate(this.GetFirstDateInCalendarPage());
  }

  SetDefaultCalendar() { // Return True if SelectedCalendar is !== undefined
    let SelectedCalendar = this.calendarService.GetSelectedCalendar();
    
    if (SelectedCalendar !== undefined && SelectedCalendar.id !== undefined) {
      this.LoadEvents(SelectedCalendar.id);
      this.SelectedCalendarName = SelectedCalendar.name;
      return true;
    }
    setTimeout(()=>this.SetDefaultCalendar(),100);
  }
  LoadEvents(id: number) { //Pobiera wydarzenia dla wybranego kalendarza
    this.eventService.Get("/" + id);
  }
  GetNextCalendar() { // Po nacisnieciu strzałki w prawo generuje następny kalendarz z tablicy
    let SelectedCalendar = this.calendarService.GetNextCalendar();

    if (SelectedCalendar.id !== undefined)
      this.LoadEvents(SelectedCalendar.id);
    this.SelectedCalendarName = SelectedCalendar.name
  }
  GetForwardCalendar() {  // Po nacisnieciu strzałki w lewo generuje poprzedni kalendarz z tablicy
    let SelectedCalendar = this.calendarService.GetForwardCalendar();
    if (SelectedCalendar.id !== undefined)
      this.LoadEvents(SelectedCalendar.id);
    this.SelectedCalendarName = SelectedCalendar.name
  }
  AddEventsToDate() { // Przypisuje pobrane wydarzenia do komponentu Day
    if (
      this.eventService.objects !== undefined &&
      this.eventService.objects.length !== 0
    ) {
      const objects = Array.from(
        this.eventService.objects.sort((a, b) => a.date - b.date)
      );
      let index = 0;
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
      return true;
    }
    return false;
  }
  DateStringUpdate() { // Generuje nagłówek kalendarza November 2019
    this.DateString = `${this.MonthName[this.DisplayMonth]} ${
      this.DisplayYear
      }`;
  }
  GenerateCalendarDate(startDate) { //Przypisuje numery dni miesiąca do miejsc w tablicy month  w generowanym kalendarzu
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

  ngOnInit() { this.SetDefaultCalendar() }
  ChangeMonth(monthNumber) { //Nazdoruje zmiane miesiaca przez usera i sprawdza czy nie trzeba zmienić roku po zmianie miesiaca
    this.DisplayMonth = monthNumber;
    if (this.DisplayMonth > 11) {
      this.DisplayMonth = this.DisplayMonth - 11;
      this.DisplayYear++;
    }
    if (this.DisplayMonth < 0) {
      this.DisplayMonth = 11 + this.DisplayMonth;
      this.DisplayYear--;
    }
 //TODO Create function the same code is in constructor
    this.GenerateCalendarDate(this.GetFirstDateInCalendarPage());
    this.DateStringUpdate();
  }
  AddEvent(title: HTMLInputElement, time: HTMLInputElement) {
    this.eventService.Add(title.value, new Date(this.selectedDay.date), time.value,this.calendarService.SelectedCalendar.id);
  }
  ngAfterViewInit() {
    this.SetDefaultCalendar()

  }
  GetFirstDateInCalendarPage(){
    const firstDayOfMonth = new Date(this.DisplayYear, this.DisplayMonth, 1); // }}
    let dayOfWeek = firstDayOfMonth.getDay(); // }
    if (dayOfWeek === 0) {                        // Sprawdzanie który dzein tygodnia to pierwszy dzien miesiaca        
      dayOfWeek = 7;                                                              // Wyliczanie Pierwszego dnia w tablicy month 
    }                                        // } 

      return firstDayOfMonth.getTime() - (dayOfWeek - 1) * this.DAY_IN_MILSEC;  // }} Wyliczanie Pierwszego dnia w talicy (Pierwszy dzien miesiaca) - (Dzien tygodnia(Pierwszy miesiaca)) Ponieważ rozmiar tablicy to 6*7 co daje 42 dni inaczej 6 tygodni Trzeba dobrać po kinkanascie dni tak żeby każdy znalazł sie w odpowiedniej kolumnie Pod swoja nazwą dnia

  }
}

