import { Component, OnInit, SimpleChange, OnDestroy } from '@angular/core';
import { AddRemoveGoals } from './add-remove-goals';
import { AddRemoveTask } from '../to-do/add-remove-task';
import { DBAPI } from '../DBAPI.service';
import {Goal} from './goal';
import { from, Subscription } from 'rxjs';
import { Task } from '../to-do/task';
@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit, OnDestroy {

  goalsManager: AddRemoveGoals;
  goalsSubscription: Subscription;
  TodayDate: string;


  ngOnDestroy(): void {
    this.goalsSubscription.unsubscribe();
  }
  ngOnInit(): void {

  }
  // tslint:disable-next-line:max-line-length
  AddTaskButtonClick(title: HTMLInputElement, date: HTMLInputElement, description: HTMLInputElement, project: HTMLInputElement, addTaskForm: any, thisButton: any) {
    // this.TM.AddTask(title.value,  date.value, parseInt(project.value, 10));
   this.ResetInputStep(title, date, description, addTaskForm, thisButton);

    }
    // tslint:disable-next-line:max-line-length
    ResetInputStep(title: HTMLInputElement, date: HTMLInputElement, description: HTMLInputElement, addTaskForm: any, thisButton: any) {

      title.value = '';
      date.value = this.TodayDate;
      description.value = '';

    }


  // tslint:disable-next-line:max-line-length
  AddGoalButtonClick(title: HTMLInputElement,  description: HTMLInputElement, addTaskForm: any, thisButton: any) {
   this.goalsManager.AddGoal(title.value, description.value);
   this.ResetInputGoal(title, description, addTaskForm, thisButton);

    }
    // tslint:disable-next-line:max-line-length
    ResetInputGoal(title: HTMLInputElement, description: HTMLInputElement, addTaskForm: any, thisButton: any) {
      addTaskForm.style.display = 'none';
      thisButton.style.display = 'inline';
      title.value = '';
      description.value = '';

    }

    RemoveGoal(goal: Goal) {
     this.goalsManager.RemoveGoal(goal);
    }
  HideShowElement(el: any) {

    let display = el.style.display;
    if (display === '') { display = 'none'; }
    if (display !== 'none') { el.style.display = 'none'; } else { el.style.display = 'block'; }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
  }
  ShowForm(addTaskForm: any, thisButton: any): void {
    this.HideShowElement(addTaskForm);
    this.HideShowElement(thisButton);
  }
  ResetStepAddInputs(biggestQueue: number, title: HTMLInputElement, queue: HTMLInputElement, description: HTMLInputElement)
  {
    title.value = '';
    queue.value = (biggestQueue + 1).toString();
    description.value = '';
  }
  RemoveStep(step: Task)
  {
    // this.TM.RemoveTask(step);
  }
  DateChange(task: Task, dateField: any) {
    const date = dateField.value;
    if (date.toString() !== '')
    {
      // this.TM.ChangeTaskDate(task,  date);
    }
    else
    {
      dateField.value = task.date;
    }
}
  DateToStringYYYYMMDD(date: Date): string
  {
    return date.toISOString().substring(0, 10);
  }
  constructor(private connectionAPI: DBAPI ) {
    this.TodayDate = this.DateToStringYYYYMMDD(new Date());
    this.goalsManager = new AddRemoveGoals(this.connectionAPI);
   }



}
