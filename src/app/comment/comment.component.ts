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

  _task: Task;
  comments: Comment[];
  commentsObserwable$: Observable<Comment>;
  @Output() taskChanged = new EventEmitter<Task>();
  @Input()
  get task()
  {
    return this._task;
  }
  set task(value)
  {
    this._task = value;
    this.taskChanged.emit(value);
  }
  ngOnInit(): void {
    this.commentsObserwable$ = this.connectionAPI.getObjects('task/comments/' + this.task.id + '/' + this.task.id_user);
  }
  constructor(private connectionAPI: DBAPI) {

  }
  getComments(task: Task): Observable<Comment> {
    this.commentsObserwable$ = this.connectionAPI.getObjects('task/comments/' + task.id + '/' + task.id_user);
    return this.commentsObserwable$;
  }
  EditComment(com: Comment) {
    console.log(com);
    this.connectionAPI.updateObjects('tasks/comments/update', com).subscribe(console.error);
  }
  AddComment(comment, task) {

    comment = new Comment(0, comment, task.id_user, task.id);
    if (comment !== '') {
      this.connectionAPI.addObjects('tasks/comments/add', comment).subscribe(res => { }, console.error);
    }
  }
  RemoveComment(comment) {
    this.connectionAPI.removeObject('task/comments/remove/' + comment.id + '/' + comment.id_user).subscribe(console.error);
  }



}
