import { Task } from './task';
import { APIService } from '../api.service';
import { Injectable } from '@angular/core';
import { URL } from '../ApiUrls';
import { AbstractService } from '../abscract.service';

@Injectable()

export class TaskService extends AbstractService //Metody Remove Edit i Get Dziedziczy od Klasy Manager
{

  constructor(connectionAPI: APIService) {
    super(connectionAPI, URL.API_TASK);
  }
  Sort() {
    this.sortTaskByQueue(this.objects);
    this.sortTaskByDate(this.objects);
  }

  Add(title: string, date: any, project: number) {

    let queue = 0;
    //Ustalanie Kolejnosci w zadaniach
    if (date !== undefined) {
      if (this.objects.length > 0) {

        this.objects.forEach(task => { // getting biggest queue
          if (task.date.toString().substring(0, 10) === date.toISOString().substring(0, 10)) {
            if (task.queue > queue) {
              queue = task.queue + 1;
            }
          }
        });
      }
      // Dodawanie Zadania
      this.connectionAPI.addObjects(URL.API_TASK,
        {
          'title': title,
          'id_project': project,
          'date': date,
          'queue': queue,
          'status': false,
          'priority': 1,
          'id_user': 1,
        })
        .subscribe(res => {
          this.objects.push(res);
          this.Sort();
        },
          console.error
        );
    }
  }
  Remove()
  {
    
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
    this.sortTaskByQueue(this.objects);
    this.sortTaskByDate(this.objects);
    let foundSameQueue = false;
    let lastQueueValue = parseInt(task.queue.toString(), 10) + 1;
    this.objects.forEach(el => {
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
    this.sortTaskByQueue(this.objects);
    this.sortTaskByDate(this.objects);

  }

}
// tslint:disable-next-line:prefer-const
