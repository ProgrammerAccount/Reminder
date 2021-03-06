import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule, MatCheckboxModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TimerModule } from '../timer/timer.module';
import { GoalService } from '../goals/goal.service';
import { CommentService } from '../comment/comment.service';




@NgModule({
  declarations: [TaskListComponent, TaskComponent],
  imports: [
    FormsModule,
    MatIconModule,
    OwlDateTimeModule,
    MatCheckboxModule,
    OwlNativeDateTimeModule,
    CommonModule
    , MatInputModule,
    TimerModule,
    MatMenuModule,
    MatSelectModule
  ],
  exports: [
    TaskListComponent, TaskComponent],
  providers: [TaskService, GoalService, CommentService]
})
export class TodoModule { }
