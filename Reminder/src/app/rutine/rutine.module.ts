import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutineListComponent } from './rutine-list/rutine-list.component';
import { RutineComponent } from './rutine/rutine.component';



@NgModule({
  declarations: [RutineListComponent, RutineComponent],
  imports: [
    CommonModule
  ],
  exports:[
    RutineListComponent
  ]
})
export class RutineModule { }
