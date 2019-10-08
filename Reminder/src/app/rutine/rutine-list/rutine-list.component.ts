import { Component, OnInit } from '@angular/core';
import { RutineService } from '../rutine.service';

@Component({
  selector: 'app-rutine-list',
  templateUrl: './rutine-list.component.html',
  styleUrls: ['./rutine-list.component.css']
})
export class RutineListComponent implements OnInit {
  constructor(private RutineService: RutineService) { }

  ngOnInit() {
    this.RutineService.Get();
  }

}