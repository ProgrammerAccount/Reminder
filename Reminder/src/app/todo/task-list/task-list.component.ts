import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/comment/comment.service';
import { GoalService } from 'src/app/goals/goal.service';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/api.service';
import { Moment } from 'moment';
import { Task } from '../task';
import { Goal } from 'src/app/goals/goal';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  // tslint:disable-next-line
  //https://danielykpan.github.io/date-time-picker/

  // tslint:disable-next-line:quotemark
  TodayDate: Date;
  Tasks: Array<Task>;
  Projects: Array<Goal>;
  lastTaskDate: Date;
  constructor(private TaskM: TaskService, private projectM: GoalService, private commentM: CommentService) {
    this.TodayDate = new Date();
    this.TaskM.Get().subscribe((res) => this.Tasks = res);
  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {


  }
  TaskEdit(task)
  {
    this.TaskM.Edit(task).subscribe()
  }
  TaskRemove(task)
  {
    this.TaskM.Remove(task).subscribe()
  }
  // tslint:disable-next-line:max-line-length
  AddTaskButtonClick(title: HTMLInputElement, date: any, project: HTMLInputElement, addTaskForm: any, thisButton: any): void {

    this.TaskM.Add(title.value, new Date(date.selected.toISOString()), parseInt(project.value, 10)).subscribe((res) => this.Tasks.push(res), () => { console.error });

    this.ResetAddFrom(title, date, addTaskForm, thisButton);
  }
  ResetAddFrom(title: HTMLInputElement, date: HTMLInputElement, addTaskForm: any, thisButton: any): void {
    this.HideShowElement(addTaskForm);
    this.HideShowElement(thisButton);
    title.value = '';
    this.TodayDate = new Date();
  }
  CanDisplayDate(date: Date): boolean // display date in heder
  {
    
    let taskDate = new Date(date);
    taskDate = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
    if (this.lastTaskDate === undefined) {
      this.lastTaskDate = taskDate;

      return true;
    }
    if (this.lastTaskDate.toISOString() !== taskDate.toISOString() && (this.lastTaskDate >= new Date())) {
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

    return new Date(y, m - 1, d);
  }
  GetDate(dateArg): string {
    let dateString;
    if (typeof dateArg === 'string') {
      dateString = dateArg;
    } else {
      dateString = dateArg.toISOString();
    }
    if (dateString.length > 50) {
      dateString = dateString.substring(8, 18);
    }
    const date = this.StringToDate(dateString.substring(0, 10));
    const today = this.StringToDate(new Date().toISOString().substring(0, 10));
    const DateInMilliseconds = Math.round(date.getTime() / (1000 * 60 * 60 * 24));
    const TodayDateInMilliseconds = Math.round(today.getTime() / (1000 * 60 * 60 * 24));
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
    else if (Difference < 0)
      return "Zaległe";
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
