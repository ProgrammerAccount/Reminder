import { Injectable } from '@angular/core';
import { AbstractService } from '../abscract.service';
import { APIService } from '../api.service';
import { URL } from '../ApiUrls'
import { Calendar } from './calendar';
@Injectable({
  providedIn: 'root'
})
export class CalendarService extends AbstractService {

  Sort(): void { }
  private ID_lastUsedCalendar: number;
  public SelectedCalendar: Calendar
  constructor(connectionAPI: APIService) {
    super(connectionAPI, URL.API_CALENDAR);
    this.Get();
    let ID_LastUsedCalendarOnThisDeviceString = localStorage.getItem("ID_LastUsedCalendarOnThisDevice");
    this.ID_lastUsedCalendar = (ID_LastUsedCalendarOnThisDeviceString !== null) ? parseInt(ID_LastUsedCalendarOnThisDeviceString, 10) : undefined
    this.SelectedCalendar = this.GetSelectedCalendar();
  }
  Add(title: string) {
    this.connectionAPI
      .addObjects(URL.API_CALENDAR, {
        name: title,
      })
      .subscribe(res => {
        this.objects.push(res);
      });
  }
  GetSelectedCalendar() {
    if (this.SelectedCalendar == undefined) {
      for (let i = 0; i < this.objects.length; i++) {
        if (this.objects[i].id_calendar == this.ID_lastUsedCalendar)
          this.SelectedCalendar = this.objects[i];
      }
      if (this.SelectedCalendar !== undefined)
        this.SelectedCalendar = this.objects[0];
    }
    return this.SelectedCalendar;
  }
  GetNextCalendar() {
    let indexOfSelectedCalendarInObjectArrays = this.objects.indexOf(this.SelectedCalendar)
    if (indexOfSelectedCalendarInObjectArrays != -1)
      if (indexOfSelectedCalendarInObjectArrays + 1 < this.objects.length) {
        this.SelectedCalendar = this.objects[indexOfSelectedCalendarInObjectArrays + 1]
        this.ID_lastUsedCalendar = this.SelectedCalendar.id;
      }
      else {
        this.SelectedCalendar = this.objects[0];
        this.ID_lastUsedCalendar = this.SelectedCalendar.id;

      }

    return this.SelectedCalendar;
  }
  GetForwardCalendar() {
    let indexOfSelectedCalendarInObjectArrays = this.objects.indexOf(this.SelectedCalendar)
    if (indexOfSelectedCalendarInObjectArrays != -1)
      if (indexOfSelectedCalendarInObjectArrays - 1 > 0) {
        this.SelectedCalendar = this.objects[indexOfSelectedCalendarInObjectArrays - 1]
        this.ID_lastUsedCalendar = this.SelectedCalendar.id;
      }
      else {
        this.SelectedCalendar = this.objects[this.objects.length - 1];
        this.ID_lastUsedCalendar = this.SelectedCalendar.id;

      }
    return this.SelectedCalendar;
  }
  ngOnDestroy() {
    localStorage.setItem("ID_LastUsedCalendarOnThisDevice", this.ID_lastUsedCalendar.toString())
  }
}