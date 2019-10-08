import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../todo/task';
import { APIService } from '../api.service';
import { Comment } from './comment'
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments: Comment[];
  commentsObserwable$: Observable<Comment>;
  constructor(private connectionAPI: APIService) { }
  getComments(task: Task): Observable<Comment> {
      // this.commentsObserwable$ = Observable.empty<Comment>();
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

