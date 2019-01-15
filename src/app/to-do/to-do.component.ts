import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Task } from './task';
import {AddRemoveTask} from './add-remove-task';
import { Subscription } from 'rxjs/internal/Subscription';
import { DBAPI } from '../DBAPI.service';
import { CommentsManager } from '../comments';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
// tslint:disable-next-line
//https://danielykpan.github.io/date-time-picker/

export class ToDoComponent  implements OnInit, OnDestroy {
  // tslint:disable-next-line:quotemark
  TodayDate: Date;
  commentManager: CommentsManager;
  projects: string[];
  TM: AddRemoveTask;
  lastTaskDate: Date = new Date();
  tasksSubscription: Subscription;
  constructor(private connectionAPI: DBAPI) {
    this.TodayDate = new Date();

  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.commentManager = new CommentsManager(this.connectionAPI);
    this.TM =  new AddRemoveTask(this.connectionAPI);
  }

  TaskUpdate(task)
  {
    this.TM.QuePosiotnChange(task);
  }
    // tslint:disable-next-line:max-line-length
  AddTaskButtonClick(title: HTMLInputElement, date: HTMLInputElement, project: HTMLInputElement, addTaskForm: any, thisButton: any): void {
    this.TM.AddTask(title.value, new Date(date.value), parseInt(project.value, 10));
    this.ResetInput(title, date, addTaskForm, thisButton);
  }
  ResetInput(title: HTMLInputElement, date: HTMLInputElement, addTaskForm: any, thisButton: any): void {
    addTaskForm.style.display = 'none';
    this.HideShowElement(thisButton);
    title.value = '';
    date.value = this.TodayDate.toDateString();
  }
  CanDisplayDate(task: Task): boolean // display date in heder
  {
    let taskDate = new Date(task.date);
    taskDate = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
    if (this.lastTaskDate.toISOString() !== taskDate.toISOString()) {
      this.lastTaskDate = taskDate;
      return true;
    }
    this.lastTaskDate = taskDate;

    return false;
  }

  StringToDate(date: string): Date { // string in format ISO_STRING
    const y = parseInt(date.substring(0, 4), 10);
    const m = parseInt(date.substring(5, 7), 10);
    const d = parseInt(date.substring(8, 10), 10);

    return new Date(y, m, d);
  }
  GetDate(dateArg): string {
    let dateString;
    if (typeof dateArg === 'string' )
    {
      dateString = dateArg;
    }else
    {
      dateString = dateArg.toISOString();
    }
    if (dateString.length > 50) {
    dateString = dateString.substring(8, 18);
    }
    const date = this.StringToDate(dateString.substring(0, 10));
    const today = this.StringToDate(new Date().toISOString().substring(0, 10));
    const DateInMilliseconds = Math.round(date.getTime() / (1000 * 60 * 60 * 24));

    // tslint:disable-next-line:no-bitwise
    const TodayDateInMilliseconds = Math.round(today.getTime() / (1000 * 60 * 60 * 24));
    // tslint:disable-next-line:no-bitwise
    const Difference = (DateInMilliseconds - TodayDateInMilliseconds);
    if (Difference === 0) {
      return 'Today';
    }
    else if (Difference === 1) {
      return 'Tomorrow';
    }
    else if (Difference <= 7 && Difference > 0) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    }
    else {
      return dateString.substring(0, 10);
    }
  }
  ResteCommentInput(input: HTMLInputElement): void {
    input.value = '';
  }

  HideShowElement(el: any): void {

    const display = window.getComputedStyle(el).getPropertyValue('display');
    if (display !== 'none') { el.style.display = 'none'; } else { el.style.display = 'block'; }
  }

}
