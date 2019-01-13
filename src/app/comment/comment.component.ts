import { Component, OnInit, Input, Output } from '@angular/core';
import { DBAPI } from '../DBAPI.service';
import { Comment } from './comment';
import { Observable } from 'rxjs';
import { Task } from '../to-do/task';
import { EventEmitter } from 'events';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {

  _object: Task;
  comments: Comment[];
  @Output() taskChanged = new EventEmitter<Task>();
  @Input()
  get object() {
    return this._object;
  }
  set object(value) {
    this._object = value;
    this.taskChanged.emit(value);
  }
  ngOnInit(): void {
    this.getComments();
  }
  constructor(private connectionAPI: DBAPI) { }
  ResteCommentInput(input: HTMLInputElement): void {
    input.value = '';
  }
  getComments() {
    this.connectionAPI.getObjects('task/comments/' + this.object.id + '/' + this.object.id_user).subscribe(res => {
      this.comments = res;
    });
  }
  EditComment(com: Comment) {
    this.connectionAPI.updateObjects('tasks/comments/update', com).subscribe(console.error);
  }
  AddComment(comment) {
    comment = new Comment(0, comment.value, this.object.id_user, this.object.id);
    if (comment !== '') {
      this.connectionAPI.addObjects('tasks/comments/add', comment).subscribe(res => { this.comments.push(res); }, console.error);
    }
  }
  RemoveComment(comment) {
    this.connectionAPI.removeObject('task/comments/remove/' + comment.id + '/' + comment.id_user).subscribe(console.error);
    this.comments.splice(comment, 1);
  }



}
