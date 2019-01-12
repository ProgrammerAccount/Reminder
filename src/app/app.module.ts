import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToDoComponent } from './to-do/to-do.component';
import {AddRemoveTask} from './to-do/add-remove-task';
import { RutineComponent } from './rutine/rutine.component';
import { GoalsComponent } from './goals/goals.component';
import { BodyComponent } from './body/body.component';
import { TimeLogerComponent } from './time-loger/time-loger.component';
import { APP_BASE_HREF } from '@angular/common';
import { DBAPI } from './DBAPI.service';
import {HttpClientModule} from '@angular/common/http';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule, MatIconModule, MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule} from '@angular/material';



const appRoutes: Routes = [
  {path : 'todo', component : ToDoComponent},
  {path : 'rutine', component : RutineComponent},
  {path : 'timer', component : TimeLogerComponent},
  {path : 'goals', component : GoalsComponent},
  {path : 'body', component : BodyComponent},
  {path : '', redirectTo: '/todo', pathMatch: 'full'},
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToDoComponent,
    RutineComponent,
    GoalsComponent,
    BodyComponent,
    TimeLogerComponent,
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
    AngularDateTimePickerModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true})
  ],
  providers: [DBAPI, AddRemoveTask, {provide: APP_BASE_HREF, useValue : './' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
