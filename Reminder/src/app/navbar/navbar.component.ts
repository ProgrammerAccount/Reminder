import { Component, OnInit } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule],
  exports: [MatButtonModule, MatCheckboxModule],
})
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  MenuVisible: boolean;
  ngOnInit() {
    this.MenuVisible = false;

  }
  dropMenu(): void {
    if (this.MenuVisible === false) {
    this.MenuVisible = true;
    } else { this.MenuVisible = false; }
  }

}
