import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerDailyComponent } from './timer-daily.component';

describe('TimerDailyComponent', () => {
  let component: TimerDailyComponent;
  let fixture: ComponentFixture<TimerDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
