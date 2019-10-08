import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/todo/task.service';
import { GoalService } from '../goal.service';
import { Subscription } from 'rxjs';
import { Goal } from '../goal';
import { APIService } from 'src/app/api.service';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  goalsManager: GoalService;
  goalsSubscription: Subscription;
  TodayDate: string;
  TM: TaskService;
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
      goal.stepsManager = new TaskService(this.connectionAPI);
      goal.stepsManager.Get('/' + goal.id);
    }
  }
  // tslint:disable-next-line:max-line-length
  AddGoalButtonClick(title: HTMLInputElement) {
    this.goalsManager.AddGoal(title.value);
    this.ResetInputGoal(title);

  }
  // tslint:disable-next-line:max-line-length
  ResetInputGoal(title: HTMLInputElement) {
    title.value = '';
  }
  AddTaskButtonClick(goal: Goal, title: HTMLInputElement, date: HTMLInputElement, addTaskForm: any): void {
    goal.stepsManager.Add(title.value, new Date(date.value), goal.id);
    this.ResetInput(title, date, addTaskForm);
  }
  ResetInput(title: HTMLInputElement, date: HTMLInputElement, addTaskForm: any): void {
    title.value = '';
    date.value = this.TodayDate;
  }//Ustawia formularz dodawania zadań do celu do domyslnych wartosci

  HideShowElement(el: any): void {
    const display = window.getComputedStyle(el).getPropertyValue('display');
    if (display !== 'none') { el.style.display = 'none'; } else { el.style.display = 'block'; }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
  }

  DateToStringYYYYMMDD(date: Date): string { //Pobiera zmienna typu Date a zwraca date w formacie YYYY-MM-DD typu string
    return date.toISOString().substring(0, 10);
  }
  constructor(private connectionAPI: APIService) {
    this.TodayDate = this.DateToStringYYYYMMDD(new Date());
    this.goalsManager = new GoalService(this.connectionAPI);
    this.TM = new TaskService(connectionAPI);
  }



}
