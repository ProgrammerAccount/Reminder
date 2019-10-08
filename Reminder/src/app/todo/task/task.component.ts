import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-task',
  //Animacja usuwania zadania przesuwa zadanie w góre jednoczesnie zmiejszając jego opacity 
  animations: [
    trigger('remove', [
      state('init', style({
        'opacity': '1',
      })),
      state('rm', style({
        'opacity': '0',
        'margin-top': '-42px'
      })),
      transition('* => *', animate('400ms'))
    ])
  ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  stateRemove = 'init';
  _task: Task;
  @Input() task: Task;
  @Output() taskEdit = new EventEmitter<Task>();
  @Output() taskRemove = new EventEmitter<Task>();
  @Output() timerStart = new EventEmitter<any>();


  constructor() {
  }

  HideShowElement(el: any): void {
    const display = window.getComputedStyle(el).getPropertyValue('display');
    if (display !== 'none') { el.style.display = 'none'; } else { el.style.display = 'block'; }
  }
  ChangeTaskDate(date: HTMLInputElement) {
    this.task.date = new Date(date.value);
    this.sendEditRequest();

  }
  TimerStart() {
    this.timerStart.emit(); //Wysyła sygnał do TimerService, który uruchamia Timer 
  }
  sendEditRequest() {
    if (this.task.id_project === null) { this.task.id_project = 0; }
    this.taskEdit.emit(this.task); //Wysyła objekt Task do TaskService który wysyła zapytanie do bazy danych mające na celu edycje rekordu
  }
  sendRemoveRequest() {
    this.stateRemove = 'rm';
    setTimeout(() => {
      this.taskRemove.emit(this.task); //Wysyła objekt Task do TaskService który wysyła zapytanie do bazy danych mające na celu zmiane statusu rekordu na usuniety 
    }, 380);
  }
  GetDate(date): string { //Pobiera zmienna typu Date a zwraca date w formacie YYYY-MM-DD typu string
    let dateString;
    if (typeof date === 'string') {
      dateString = date; //Jesli data jest typu String zamiast Date nie musimy jej konwertować do stringa
    } else {
      dateString = date.toISOString(); // Pobieramy date w postaci napisu
    }
    if (dateString.length > 50) { //Jesli format daty to Central European Standard Time
      dateString = dateString.substring(8, 18);
    }
    else { dateString = dateString.substring(0, 10); }//Jesli format daty to YYYY-MM-DDTHH:MM:SS
    return dateString;
  }


}

