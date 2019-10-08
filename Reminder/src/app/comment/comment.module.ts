import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CommentComponent],
  imports: [FormsModule,
    CommonModule, MatIconModule
  ], exports: [CommentComponent]
})
export class CommentModule { }
