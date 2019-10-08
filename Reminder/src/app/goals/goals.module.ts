import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalListComponent } from './goal-list/goal-list.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommentModule } from '../comment/comment.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TodoModule } from '../todo/todo.module';
 


@NgModule({
  declarations: [GoalListComponent],
  imports: [
    TodoModule,CommonModule, FormsModule, MatIconModule, CommentModule, OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [
    GoalListComponent
  ]
})
export class GoalsModule { }
