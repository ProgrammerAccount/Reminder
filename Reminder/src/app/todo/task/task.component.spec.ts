import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule, MatIconModule, MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule } from '@angular/material';

import { TaskComponent } from './task.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToDoComponent } from '../to-do/to-do.component';
import { RutineComponent } from '../rutine/rutine.component';
import { GoalsComponent } from '../goals/goals.component';
import { BodyComponent } from '../body/body.component';
import { TimeLogerComponent } from '../time-loger/time-loger.component';
import { CommentComponent } from '../comment/comment.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { DBAPI } from '../DBAPI.service';
import { TaskManager } from '../to-do/add-remove-task';
import { APP_BASE_HREF } from '@angular/common';
import { TimerComponent } from '../timer/timer.component';
import { SubTimerStartStopComponent } from '../sub-timerStartStop/sub-timer.component';
import { SubTimerComponent } from '../sub-timer/sub-timer.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {

  }));
  const appRoutes: Routes = [
    {path : 'todo', component : ToDoComponent},
    {path : 'rutine', component : RutineComponent},
    {path : 'timer', component : TimeLogerComponent},
    {path : 'goals', component : GoalsComponent},
    {path : 'body', component : BodyComponent},
    {path : '', redirectTo: '/todo', pathMatch: 'full'},
    ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        ToDoComponent,
        RutineComponent,
        GoalsComponent,
        BodyComponent,
        TimeLogerComponent,
        TaskComponent,
        CommentComponent,
        TimerComponent,
        SubTimerStartStopComponent,
        SubTimerComponent
        ],
      imports: [
  FormsModule,
        BrowserModule,
        OwlDateTimeModule,
        BrowserAnimationsModule,
        OwlNativeDateTimeModule,
        HttpClientModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatInputModule,
        RouterModule.forRoot(appRoutes, { enableTracing: true})
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return dateString in ISO format',()=>{
    let date =  new Date('2019-12-22');
    expect(component.GetDate(date)).toBe('2019-12-22');
    date =  new Date('2019-12-22T12:45');
    expect(component.GetDate(date)).toBe('2019-12-22');
    date =  new Date('2019-12-22');
    expect(component.GetDate(date)).toBe('2019-12-22');
    date =  new Date('2019-12-22');
    expect(component.GetDate(date)).toBe('2019-12-22');
    date =  new Date('2019-12-22');
    expect(component.GetDate(date)).toBe('2019-12-22');

  });
});
