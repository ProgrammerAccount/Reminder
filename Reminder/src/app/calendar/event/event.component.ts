import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent, Notyfication } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {
  @Input() event: CalendarEvent;
  constructor(private eventService: EventService) { }

  ngOnInit() {
  }
  RemoveEventNotyfication(reminder) {
    let index = this.event.reminders.indexOf(reminder);
    if (index != -1)
      this.event.reminders.splice(index, 1)
      this.eventService.RemoveNotyfication(reminder.id_event,reminder.time_before_in_milisec);

  }
  UpdateNotyfication(time:number,time_unit:number,changedReminder:Notyfication)
  {
    
    let i = 0;
    for(;i<this.event.reminders.length;i++)

      if (changedReminder.id == this.event.reminders[i].id)
      {
        this.event.reminders[i].time_before_in_milisec=time*time_unit;
        break
      }
      
    
    this.eventService.UpdateNotyfication(this.event.reminders[i]);
    
  }
  addEventNotyfication() {
    if (this.event.reminders == undefined)
      this.event.reminders = []
    this.eventService.AddNotyfication(this.event.id,10 * 60000).subscribe((res)=>this.event.reminders.push(res),()=>console.error)

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
