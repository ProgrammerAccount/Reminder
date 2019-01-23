import { Component, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reminder';
  constructor(updates: SwUpdate) {
    updates.activated.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }
}
