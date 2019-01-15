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

  constructor(private connectionAPI: DBAPI, id_project: number = 0) {
    if (this.tasks === undefined) {
      this.tasks = new Array();
    }
    let TaskURL = 'tasks';
    if (id_project !== 0)
    {
      TaskURL = TaskURL + '/' + id_project;
    }
    this.tasksSubscription = this.connectionAPI
    .getObjects(TaskURL)
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
  // tslint:disable:curly
  sortTaskByQueue(task: Task[]): void {
    task.sort((a, b) => {
      return a.queue - b.queue;
    });
  }

  sortTaskByDate(task: Task[]): void {
    this.tasks = this.tasks.sort((a, b) => {
      const x = new Date(a.date);
      const y = new Date(b.date);
      console.log(x.getTime());
      console.log(y.getTime());
      console.log(x.getTime() - y.getTime());

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
    console.log(this.tasks);
  }

}
// tslint:disable-next-line:prefer-const
let TM: AddRemoveTask;
export default TM;
