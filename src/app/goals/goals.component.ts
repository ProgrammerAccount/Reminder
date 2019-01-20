import { Component, OnInit, SimpleChange, OnDestroy } from '@angular/core';
import { AddRemoveGoals } from './add-remove-goals';
import { TaskManager } from '../to-do/add-remove-task';
import { DBAPI } from '../DBAPI.service';
import { Goal } from './goal';
import { from, Subscription } from 'rxjs';
import { Task } from '../to-do/task';
import { MatIconModule } from '@angular/material';
@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit, OnDestroy {

  goalsManager: AddRemoveGoals;
  goalsSubscription: Subscription;
  TodayDate: string;
  TM: TaskManager;
  ngOnDestroy(): void {
    this.goalsSubscription.unsubscribe();
  }
  ngOnInit(): void {

  }
  // tslint:disable-next-line:max-line-length
  btnAnimation(btn) {
    btn = btn._elementRef.nativeElement;
    if (btn.classList.contains('ShowStepBtn')) {
      btn.classList.remove('ShowStepBtn');
      btn.classList.add('HideStepBtn');
    }
    else {
      btn.classList.add('ShowStepBtn');
      btn.classList.remove('HideStepBtn');
    }
  }
  // tslint:disable-next-line:max-line-length
  ResetInputStep(title: HTMLInputElement, date: HTMLInputElement, description: HTMLInputElement, addTaskForm: any, thisButton: any) {

    title.value = '';
    date.value = this.TodayDate;
    description.value = '';

  }

  stepsManagerInit(goal: Goal) {
    if (goal.stepsManager === undefined) {
      goal.stepsManager = new TaskManager(this.connectionAPI, goal.id);
    }
  }
  // tslint:disable-next-line:max-line-length
  AddGoalButtonClick(title: HTMLInputElement, description: HTMLInputElement, addTaskForm: any, thisButton: any) {
    this.goalsManager.AddGoal(title.value);
    this.ResetInputGoal(title, description, addTaskForm, thisButton);

  }
  // tslint:disable-next-line:max-line-length
  ResetInputGoal(title: HTMLInputElement, description: HTMLInputElement, addTaskForm: any, thisButton: any) {
    addTaskForm.style.display = 'none';
    thisButton.style.display = 'inline';
    title.value = '';
    description.value = '';

  }
  AddTaskButtonClick(goal: Goal,title: HTMLInputElement, date: HTMLInputElement, addTaskForm: any, thisButton: any): void {
    goal.stepsManager.Add(title.value, new Date(date.value), goal.id);
    this.ResetInput(title, date, addTaskForm, thisButton);
  }
  ResetInput(title: HTMLInputElement, date: HTMLInputElement, addTaskForm: any, thisButton: any): void {
    addTaskForm.style.display = 'none';
    this.HideShowElement(thisButton);
    title.value = '';
    date.value = this.TodayDate;
  }
  RemoveGoal(goal: Goal) {
    this.goalsManager.RemoveGoal(goal);
  }
  HideShowElement(el: any): void {
    const display = window.getComputedStyle(el).getPropertyValue('display');
    if (display !== 'none') { el.style.display = 'none'; } else { el.style.display = 'block'; }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
  }
  ResetStepAddInputs(biggestQueue: number, title: HTMLInputElement, queue: HTMLInputElement, description: HTMLInputElement) {
    title.value = '';
    queue.value = (biggestQueue + 1).toString();
    description.value = '';
  }


  DateToStringYYYYMMDD(date: Date): string {
    return date.toISOString().substring(0, 10);
  }
  constructor(private connectionAPI: DBAPI) {
    this.TodayDate = this.DateToStringYYYYMMDD(new Date());
    this.goalsManager = new AddRemoveGoals(this.connectionAPI);
    this.TM = new TaskManager(connectionAPI);
  }



}
