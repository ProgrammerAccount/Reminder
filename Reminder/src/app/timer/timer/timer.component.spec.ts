import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TimerService } from '../timer.service';
import { APIService } from 'src/app/api.service';
import { TimerComponent } from './timer.component';
import { Timer } from '../timer';

describe('SubTimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerComponent],
      imports:[OwlNativeDateTimeModule,OwlDateTimeModule,FormsModule,HttpClientTestingModule],
      providers:[TimerService,APIService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    component.subTimer = new Timer(1,new Date(),null,1,'xdddd');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
