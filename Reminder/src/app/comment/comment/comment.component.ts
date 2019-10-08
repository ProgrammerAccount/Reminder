import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../comment';
import { Observable } from 'rxjs';
import { URL } from '../../ApiUrls';
import { Task } from 'src/app/todo/task';
import { APIService } from 'src/app/api.service';
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
  constructor(private connectionAPI: APIService) { }
  ResteCommentInput(input: HTMLInputElement): void {
    input.value = '';
    this.getComments();
  }
  getComments() {
    this.connectionAPI.getObjects(URL.API_TASK_COMMENT + '/' + this.object.id).subscribe(res => {
      this.comments = res;
    });
  }
  EditComment(com: Comment) {
    this.connectionAPI.updateObjects(URL.API_TASK_COMMENT, com).subscribe(console.error);
  }
  AddComment(comment) {
    comment = new Comment(0, comment.value, this.object.id_user, this.object.id);
    if (comment !== '') {
      this.connectionAPI.addObjects(URL.API_TASK_COMMENT, comment).subscribe(res => { this.comments.push(res);}, console.error);
    }
  }
  RemoveComment(comment) {
    this.connectionAPI.removeObject(URL.API_TASK_COMMENT + '/' + comment.id).subscribe(console.error);
    this.comments.splice(comment, 1);
  }



}
