import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Task } from '../../todo/task';
import { EventService } from '../event.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() public date: Date;
  @Input() public events: Array<Task>
  @Output() public eventToDisplay = new EventEmitter<Array<Task>>()
  @ViewChild('dayHTMLElement', { static: false }) dayHTMLElement;
  private day: String;
  private _isSelected: boolean;

  get isSelected(): boolean {
    return this._isSelected;
  }
  set isSelected(value: boolean) {
    this._isSelected = value;
    if (this.dayHTMLElement != undefined)
      if (value) {
        this.OnSelectChange('#ccc');

        this.eventToDisplay.emit(this.filterEventByDate());
      } else { this.OnSelectChange('#fff'); }
  }
  isEvent(): boolean {
    let events = this.filterEventByDate()
    let isEvent = false;
    if (events != []) {
      events.map((x) => { if (x.status === 2) isEvent = true })
    }
    return isEvent;
  }


  constructor() {

  }
  public filterEventByDate(): Array<Task> {
    let eventToDisplay = new Array<Task>();
    this.events.map((x) => {
      let date = new Date(x.date);
      if (date.getFullYear() === this.date.getFullYear() && date.getMonth() === this.date.getMonth() && date.getDate() === this.date.getDate())
        eventToDisplay.push(x);
    })
    return eventToDisplay;
  }
  LoadEvents() {
    if (this.isEvent()) {
      this.setEvent();
    }
    this.eventToDisplay.emit(this.filterEventByDate());

  }
  ngAfterViewInit() {
    //this.eventService.Get(`/${this.id_project}/${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`);
    if (this.isEvent()) {
      this.setEvent();
    }
    if (this.isSelected) {
      this.OnSelectChange('#ccc');
      this.eventToDisplay.emit(this.filterEventByDate());
    }
  }
  ngOnInit() {
    this.day = this.date.getDate().toString();
  }
  OnSelectChange(color: string) {
    this.dayHTMLElement.nativeElement.style.backgroundColor = color;
  }
  setEvent() {
    this.dayHTMLElement.nativeElement.style.backgroundColor = `rgb(${this.date.getHours() * 1000 % 155 + 100}, ${this.date.getDate() * 1000 % 155 + 100}, ${this.date.getMonth() * 1000 % 155 + 100})`;
  }
}
