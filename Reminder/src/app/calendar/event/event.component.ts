import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '../event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {
  @Input() event: CalendarEvent;
  constructor() { }

  ngOnInit() {
  }
  RemoveReminder(reminder) {
    let index = this.event.reminders.indexOf(reminder);
    if (index != -1)
      this.event.reminders.splice(index, 1)
  }
  addReminder() {
    if (this.event.reminders == undefined)
      this.event.reminders = []
    this.event.reminders.push({ "time_before_in_milisec": 10 * 60000 })
  }
  MilisecConverter(miliseconds: number) {
    if (miliseconds / 60000 < 60) return miliseconds / 60000;
    else if (miliseconds / 3600000 < 24) return miliseconds / 3600000;
    else return miliseconds / 86400000;
  }
  ClosePopUpMenu(popupmenu: HTMLElement) {
    popupmenu.classList.remove("active");
    document.getElementsByClassName('overlay')[0].classList.remove('active');

  }
  OpenPopUpMenu(popupmenu: HTMLElement) {
    popupmenu.classList.add("active");
    document.getElementsByClassName('overlay')[0].classList.add('active');
  }
}
