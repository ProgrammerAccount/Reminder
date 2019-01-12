import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoComponent } from './to-do.component';
import { Routes, RouterModule } from '@angular/router';
import { RutineComponent } from '../rutine/rutine.component';
import { TimeLogerComponent } from '../time-loger/time-loger.component';
import { GoalsComponent } from '../goals/goals.component';
import { BodyComponent } from '../body/body.component';
import { AppComponent } from '../app.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { AddRemoveTask } from './add-remove-task';
import { Task } from './task';

describe('ToDoComponent', () => {
  let component: ToDoComponent;
  let fixture: ComponentFixture<ToDoComponent>;

  const appRoutes: Routes = [
    {path : 'todo', component : ToDoComponent},
    {path : 'rutine', component : RutineComponent},
    {path : 'timer', component : TimeLogerComponent},
    {path : 'goals', component : GoalsComponent},
    {path : 'body', component : BodyComponent},
    {path : '', redirectTo: '/todo', pathMatch: 'full'},  ];
  describe('ToDoComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          ToDoComponent,
          BodyComponent,
          GoalsComponent,
          NavbarComponent,
          RutineComponent,
          TimeLogerComponent
          ],
        imports: [
          FormsModule,
          BrowserModule,
          RouterModule.forRoot(appRoutes, { enableTracing: true })
          ],
          providers: [
            { provide: APP_BASE_HREF, useValue : '/' }
          ],
      }).compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.tasksManager =  new AddRemoveTask(new Array<Task[]>(), new Array<string>());
  });
  afterEach(() => {
    localStorage.removeItem('tasks');
    localStorage.removeItem('tfd');

  });
  /*it('shuold return todayDate',() => {
    expect(component.GetDateYYYY_MM_DD()).toBe('2018-11-01');
  });*/
  it('should ResetInputs', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const titleInput = <HTMLInputElement>el.querySelector('#title');
    const priorityInput = <HTMLInputElement>el.querySelector('#priority');
    const dateInput = <HTMLInputElement>el.querySelector('#date');
    const descriptionInput = <HTMLInputElement>el.querySelector('#description');

    component.ResetInput(titleInput, priorityInput, dateInput, descriptionInput , titleInput , titleInput);
    expect(titleInput.value).toBe('');
    expect(priorityInput.value).toBe('1');
    expect(dateInput.value).toBe(component.GetDateYYYY_MM_DD());
    expect(descriptionInput.value).toBe('');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return color assigned with number 1-black', () => {
    expect(component.GetColor(1)).toBe('black');
  });
  it('should return color assigned with number 2-yellow', () => {
    expect(component.GetColor(2)).toBe('yellow');
  });
  it('should return color assigned with number 3-orange', () => {
    expect(component.GetColor(3)).toBe('orange');
  });
  it('should return color assigned with number 4-red', () => {
    expect(component.GetColor(4)).toBe('red');
  });
  it('should Save tasks', () => {
    component.SaveTasks();
    expect(null != localStorage.getItem('tasks')).toBeTruthy();
    expect(null != localStorage.getItem('tfd')).toBeTruthy();
  });
  it('should read localStorage', () => {
    localStorage.setItem('test', JSON.stringify('testValue'));
    expect(component.ReadLocalStorageJSON('test')).toBe('testValue');
  });
  it('should change Visible', () => {
    const el:HTMLElement = fixture.debugElement.nativeElement.querySelector('#date');
    const elDisplay = el.style.visibility;
    component.HideShowElement(el);
    expect(el.style.display != elDisplay).toBeTruthy();
  });


});
});
