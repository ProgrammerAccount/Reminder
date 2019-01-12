import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLogerComponent } from './time-loger.component';

describe('TimeLogerComponent', () => {
  let component: TimeLogerComponent;
  let fixture: ComponentFixture<TimeLogerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLogerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLogerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
