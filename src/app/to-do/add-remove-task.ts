import { Comment } from '../comments';
import {
  Task
} from './task';
import LOCAL_STORAGE_NAMES from '../LocalStorageVariabile';
import {
  Subscription, from
} from 'rxjs';
import {
  DBAPI
} from '../DBAPI.service';
import {
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
@Injectable()

export class AddRemoveTask {
  tasks: Task[];
  tasksSubscription: Subscription;

  constructor(private connectionAPI: DBAPI) {
    if (this.tasks === undefined) {
      this.tasks = new Array();
    }

    this.tasksSubscription = this.connectionAPI
    .getObjects('tasks')
    .subscribe(res => {
      this.tasks = res;
      this.sortTaskByQueue(this.tasks);
      this.sortTaskByDate(this.tasks);

      },
    console.error
    );
  }

  AddTask(title: string, date: any, project: number) {
    let queue = 0;
    if (date !== undefined) {
      if (this.tasks.length > 0) {
        this.tasks.forEach(task => { // getting biggest queue
          if (task.date === date) {
            if (task.queue > queue) {
              queue = task.queue;
            }
          }
        });
      }
      this.connectionAPI.addObjects('tasks/add', new Task(null, title, project, date, queue, false, 1, 1, false, date)).subscribe(res => {
        this.tasks.push(res);
        this.sortTaskByQueue(this.tasks);
        this.sortTaskByDate(this.tasks);
      },
        console.error
      );
    }
  }
  RemoveTask(task: Task) {
    this.connectionAPI.removeObject('tasks/remove/' + task.id).subscribe(res => { },
      console.error
    );
    this.tasks.splice(this.tasks.indexOf(task), 1);

  }
  EditTask(task: Task) {
    this.connectionAPI.updateObjects('tasks/update', <Task>task).subscribe(res => {
      this.QuePosiotnChange(task);
      this.sortTaskByQueue(this.tasks);
      this.sortTaskByDate(this.tasks);
    },
      console.error
    );
  }
  CommentChange(value: string, task: Task, index: number) {
    const i = this.tasks.indexOf(task);
    // this.tasks[i].comments[index] = value;
    if (value === '') {
      this.RemoveComment(index, task);
    }

  }


  RemoveComment(commentIndex, task) {
    const index = this.tasks.indexOf(task);
    // this.tasks[index].comments.splice(commentIndex, 1);

  }

  ChangeTaskDate(task: Task, date: Date) {
    this.tasks[this.tasks.indexOf(task)].date = date;
    this.QuePosiotnChange(task);
    this.sortTaskByQueue(this.tasks);
    this.sortTaskByDate(this.tasks);
  }
  // tslint:disable:curly
  sortTaskByQueue(task: Task[]): void {
    task.sort((a, b) => {
      return a.queue - b.queue;
    });
  }

  sortTaskByDate(task: Task[]): void {
    task.sort((a, b) => {
      const x = new Date(a.date);
      const y = new Date(b.date);
      return x.getTime() - y.getTime();
    });
  }
  QuePosiotnChange(task: Task) { // check that tasks have unique id
    this.sortTaskByQueue(this.tasks);
    this.sortTaskByDate(this.tasks);
    let foundSameQueue = false;
    let lastQueueValue = parseInt(task.queue.toString(), 10) + 1;
    this.tasks.forEach(el => {
      el.queue = parseInt(el.queue.toString(), 10);
      if (task.date === el.date && el !== task && foundSameQueue === true) {
        if (el.queue - lastQueueValue === 0) {
          el.queue++;
          lastQueueValue = el.queue;
        }
      }
      // tslint:disable-next-line:triple-equals
      if (task !== el && task.date === el.date && task.queue == el.queue && foundSameQueue === false) {
        foundSameQueue = true;
        el.queue++;
      }
    });
    this.sortTaskByQueue(this.tasks);
    this.sortTaskByDate(this.tasks);
  }

}
// tslint:disable-next-line:prefer-const
let TM: AddRemoveTask;
export default TM;
