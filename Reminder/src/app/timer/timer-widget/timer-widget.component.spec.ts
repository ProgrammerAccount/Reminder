import { async, TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { URL } from '../../ApiUrls';
import { APIService } from 'src/app/api.service';
import { TimerService } from '../timer.service';
import { TimerWidgetComponent } from './timer-widget.component';

describe('subTimer', () => {
  let service: APIService;
  let httpMock: HttpTestingController;
  let component: TimerWidgetComponent;
  let SubTimerM: TimerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimerWidgetComponent, APIService, TimerService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(APIService);
    SubTimerM = TestBed.get(TimerService);
    component = new TimerWidgetComponent(service, SubTimerM);
  });
 /* it('should create', async(
    inject([HttpClientModule, DBAPI], (http: HttpClientModule, api: DBAPI) => {
      expect(component).toBeTruthy();
    })
  ));
  it('should send POST req and create new subtimer', () => {
    component.Start();
    expect(component.SubTimerM.RunningTimer).toBeTruthy();
  });
  it('should stop timer set timer_stop and send post request to update database', async(() => {
    component.Stop();
    const req = httpMock.expectOne(URL.API_SUB_TIMER);
    expect(component.timer_stop !== undefined).toBeTruthy();
    httpMock.verify();
    expect(req.request.method).toBe('PUT');
  }));
  it('should update local timer', () => {
    const timer_value = component.local_timer;
    setTimeout(() => {
      expect(timer_value < component.local_timer).toBeTruthy();
    }, 2000);
  });
  afterEach(() => {
    httpMock.verify();
  });*/
});
