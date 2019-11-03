import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {
  @Input() event: Event;
  constructor() { }

  ngOnInit() {
  }

  ClosePopUpMenu(popupmenu:HTMLElement){
    popupmenu.classList.remove("active");
    document.getElementsByClassName('overlay')[0].classList.remove('active');

  }
  OpenPopUpMenu(popupmenu:HTMLElement){
    popupmenu.classList.add("active");
    document.getElementsByClassName('overlay')[0].classList.add('active');
  }
}
