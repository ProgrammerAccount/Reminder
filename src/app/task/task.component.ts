import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../to-do/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  _task: Task;
  @Input() task: Task;
  @Output() taskEdit = new EventEmitter<Task>();
  @Output() taskRemove = new EventEmitter<Task>();



  constructor() {
  }

  HideShowElement(el: any): void {
    const display = window.getComputedStyle(el).getPropertyValue('display');
    if (display !== 'none') { el.style.display = 'none'; } else { el.style.display = 'block'; }
  }
  ChangeTaskDate(date: HTMLInputElement) {
    this.task.date = new Date(date.value);
    this.sendEditRequest();

  }
  sendEditRequest()
  {
    this.taskEdit.emit(this.task);
  }
  sendRemoveRequest()
  {
    this.taskRemove.emit(this.task);
  }
  GetDate(date): string {
    let dateString;
    if (typeof date === 'string' )
    {
      dateString = date;
    }else
    {
      dateString = date.toISOString();
    }
    if (dateString.length > 50) {
    dateString = dateString.substring(8, 18);
    }
    else { dateString = dateString.substring(0, 10); }
      return dateString;
    }


}

