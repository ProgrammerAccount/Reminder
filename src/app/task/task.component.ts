import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DBAPI } from '../DBAPI.service';
import { Task } from '../to-do/task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  _task: Task;
  @Input() set task(value: Task) {
    this.taskChanged.emit(value);
    this._task = value;
  }
  get task() {
    return this._task;
  }
  @Output() taskChanged = new EventEmitter<Task>();



  constructor(private connectionAPI: DBAPI) {

  }
  RemoveTask() {
    this.connectionAPI.removeObject('tasks/remove/' + this.task.id).subscribe(res => { },
      console.error
    );
  }
  EditTask() {
    this.connectionAPI.updateObjects('tasks/update', this.task).subscribe(res => {
    },
      console.error
    );
  }
  HideShowElement(el: any): void {
    const display = window.getComputedStyle(el).getPropertyValue('display');
    if (display !== 'none') { el.style.display = 'none'; } else { el.style.display = 'block'; }
  }
  ChangeTaskDate(date: Date) {
    this.task.date = date;
    this.EditTask();
  }
  GetDate(dateString: string): string {
    if (dateString.length > 50) {
    dateString = dateString.substring(8, 18);
    }
    else { dateString = dateString.substring(0, 10); }
      return dateString;
    }


}

