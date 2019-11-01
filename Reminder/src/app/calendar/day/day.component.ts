import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() public date: Date;
  @Input() public event;
  @ViewChild('dayHTMLElement',{static:false}) dayHTMLElement;
  private day: String;
  private _isSelected: boolean;
  get isSelected(): boolean {
    return this._isSelected;
  }
  set isSelected(value: boolean) {
    this._isSelected = value;
    if (value) {
      this.OnSelectChange('#ccc');
    } else { this.OnSelectChange('#fff'); }
  }
  private isEvent = false;



  constructor() {}
  ngAfterViewInit() {
    console.log(this.event)
    if (this.isEvent) {
      this.setEvent();
    }
  }
  ngOnInit() {
    this.day = this.date.getDate().toString();
    if (this.event != undefined) {
      this.isEvent = true;
    }
  }
  OnSelectChange(color: string) {
    this.dayHTMLElement.nativeElement.style.backgroundColor = color;
  }
  setEvent() {
    this.dayHTMLElement.nativeElement.style.backgroundColor = this.event.color;
  }
}
