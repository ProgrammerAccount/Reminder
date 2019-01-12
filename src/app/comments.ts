import { DBAPI } from './DBAPI.service';
import { Task } from './to-do/task';

import { Observable } from 'rxjs';
export class Comment {
    id: number;
    value: string;
    id_object: number;
    id_user: number;
    constructor(id: number, value: string, id_user: number, id_object: number = 0) {
        this.id = id;
        this.value = value;
        this.id_object = id_object;
        this.id_user = id_user;
    }
}
export class CommentsManager
{
    comments: Comment[];
    commentsObserwable$: Observable<Comment>;
    constructor(private connectionAPI: DBAPI)
    { }
    getComments(task:Task): Observable<Comment>
    {
        // this.commentsObserwable$ = Observable.empty<Comment>();
        this.commentsObserwable$ = this.connectionAPI.getObjects('task/comments/' + task.id + '/' + task.id_user);
        return this.commentsObserwable$;
    }
    EditComment(com: Comment)
    {
        console.log(com);
        this.connectionAPI.updateObjects('tasks/comments/update', com).subscribe(console.error);
    }
    AddComment(comment, task) {

        comment = new Comment(0, comment, task.id_user, task.id);
        if (comment !== '') {
          this.connectionAPI.addObjects('tasks/comments/add', comment).subscribe(res => {  }, console.error);
        }
      }
      RemoveComment(comment)
      {
          this.connectionAPI.removeObject('task/comments/remove/' + comment.id + '/' + comment.id_user).subscribe(console.error);
      }
}

