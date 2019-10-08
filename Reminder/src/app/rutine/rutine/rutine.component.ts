import { Component, OnInit, Input } from '@angular/core';
import { RutineService } from '../rutine.service';
import { Rutine } from '../rutine'
@Component({
  selector: 'app-rutine',
  templateUrl: './rutine.component.html',
  styleUrls: ['./rutine.component.css']
})
export class RutineComponent implements OnInit {
  @Input() rutinesObject: Rutine;

  constructor(private service: RutineService) { }
  ngOnInit() { }
  Add(id_task: number, recursing_day: Array<number>) {
    this.service.Add(
      new Rutine(null, id_task, null, JSON.stringify(recursing_day))
    );
  }

  Edit(rutine: Rutine) {
    this.service.Edit(rutine);
  }
  Delete(id_rutine: number) {
    this.service.Remove(id_rutine);
  }
}

