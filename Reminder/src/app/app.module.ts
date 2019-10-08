import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { TaskListComponent } from './todo/task-list/task-list.component';
import { AuthService } from './login/auth.service';
import { RutineListComponent } from './rutine/rutine-list/rutine-list.component';
import { TimerListComponent } from './timer/timer-list/timer-list.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { GoalListComponent } from './goals/goal-list/goal-list.component';
import { LoginModule } from './login/login.module';
import { RutineModule } from './rutine/rutine.module';
import { TodoModule } from './todo/todo.module'
import { TimerModule } from './timer/timer.module';
import { GoalsModule } from './goals/goals.module';
import { CalendarModule } from './calendar/calendar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
 import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TaskListComponent, canActivate: [AuthService] },
  { path: 'rutine', component: RutineListComponent, canActivate: [AuthService] },
  { path: 'timer', component: TimerListComponent, canActivate: [AuthService] },
  { path: 'goals', component: GoalListComponent, canActivate: [AuthService] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthService] },
  {
    path: '',
    redirectTo: '/todo',
    pathMatch: 'full',
    canActivate: [AuthService]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
    

  ],
  imports: [
    HttpClientModule,
    LoginModule,
    TodoModule,
    RutineModule,
    TimerModule,
    GoalsModule,
    CalendarModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
