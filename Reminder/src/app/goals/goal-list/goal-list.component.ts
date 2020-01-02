import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/todo/task.service';
import { GoalService } from '../goal.service';
import { Subscription } from 'rxjs';
import { Goal } from '../goal';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  TodayDate: Date;
  Goals: Array<Goal>;
  ngOnDestroy(): void {
  }
  ngOnInit(): void {

  }
  // tslint:disable-next-line:max-line-length
  btnAnimation(btn) {

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
  ResetInputStep(title: HTMLInputElement, date: HTMLInputElement, description: HTMLInputElement) {

    title.value = '';
    date.value = this.TodayDate.toISOString();
    description.value = '';

  }

  stepsManagerInit(goal: Goal) {
    if (goal.steps === undefined) {
      this.taskService.Get('/' + goal.id).subscribe((res) => { goal.steps = res }, console.error)
    }
  }
  // tslint:disable-next-line:max-line-length
  AddGoalButtonClick(title: HTMLInputElement) {
    this.goalsService.AddGoal(title.value).subscribe(res => {
      this.Goals.push(res);
    }, console.error);
    this.ResetInputGoal(title);

  }
  // tslint:disable-next-line:max-line-length
  ResetInputGoal(title: HTMLInputElement) {
    title.value = '';
  }
  AddTaskButtonClick(goal: Goal, title: HTMLInputElement, date, addTaskForm: any): void {

    this.taskService.Add(title.value, new Date(date.value), goal.id).subscribe((res) => { this.Goals.push(res) }, console.error);
    this.ResetInput(title, date);

  }
  ResetInput(title: HTMLInputElement, date): void {
    title.value = '';

    date.selected.setDate(this.TodayDate);

  }//Ustawia formularz dodawania zadań do celu do domyslnych wartosci

  HideShowElement(el: any): void {
    const display = window.getComputedStyle(el).getPropertyValue('display');
    if (display !== 'none') { el.style.display = 'none'; } else { el.style.display = 'block'; }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
  }
  TaskEdit(task)
  {
    this.taskService.Edit(task).subscribe()
  }
  TaskRemove(task)
  {
    this.taskService.Remove(task).subscribe()
  }
  ProjectEdit(project)
  {
    this.goalsService.Edit(project).subscribe()
  }
  ProjectRemove(project)
  {
    this.goalsService.Remove(project).subscribe()
  }
  DateToStringYYYYMMDD(date: Date): string { //Pobiera zmienna typu Date a zwraca date w formacie YYYY-MM-DD typu string
    return date.toISOString().substring(0, 10);
  }
  constructor(private goalsService: GoalService, private taskService: TaskService) {
    this.TodayDate = new Date();
    this.goalsService.Get().subscribe((res) => this.Goals = res || [])


  }



}
