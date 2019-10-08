import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from './task';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from '../api.service';

describe('TaskManager', () => {

  let api: APIService;
  let httpMock: HttpClientTestingModule;
  let component: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [APIService]
    }).compileComponents();
  }));
  beforeEach(() => {
    api = TestBed.get(APIService);
    httpMock = TestBed.get(HttpClientTestingModule);
    component = new TaskService(api);
  });
  it('should init', () => {
    expect(component.objects !== undefined).toBeTruthy();
  });
  it('should QuePosiotnChange', () => {
    const arr = '   [  ' +
      '     {  ' +
      '       "date": "2019-03-08T09:50:00+00:00",   ' +
      '       "id": 1.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 1.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:50:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdasd"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-08T09:50:00+00:00",   ' +
      '       "id": 2.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 2.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:50:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdsad"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-08T09:51:00+00:00",   ' +
      '       "id": 3.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 3.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "assadads"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-08T09:51:00+00:00",   ' +
      '       "id": 4.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 4.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdasd"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-08T09:51:00+00:00",   ' +
      '       "id": 5.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 5.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdsad"  ' +
      '     }  ' +
      '  ]  ';
    component.objects = JSON.parse(arr);
    component.QuePosiotnChange(JSON.parse(      '     {  ' +
    '       "date": "2019-03-08T09:51:00+00:00",   ' +
    '       "id": 4.0,   ' +
    '       "id_project": null,   ' +
    '       "id_user": 1.0,   ' +
    '       "priority": 1.0,   ' +
    '       "queue": 5.0,   ' +
    '       "reminder": false,   ' +
    '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
    '       "status": false,   ' +
    '       "title": "asdasd"  ' +
    '     }   '));
    expect(component.objects[4].queue).toBe(6);
    component.QuePosiotnChange(JSON.parse(      '     {  ' +
    '       "date": "2019-03-08T09:51:00+00:00",   ' +
    '       "id": 4.0,   ' +
    '       "id_project": null,   ' +
    '       "id_user": 1.0,   ' +
    '       "priority": 1.0,   ' +
    '       "queue": 1.0,   ' +
    '       "reminder": false,   ' +
    '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
    '       "status": false,   ' +
    '       "title": "asdasd"  ' +
    '     }   '));
    expect(component.objects[0].queue).toBe(1);
    expect(component.objects[1].queue).toBe(2);
    expect(component.objects[2].queue).toBe(3);
    expect(component.objects[3].queue).toBe(4);
    expect(component.objects[4].queue).toBe(6);

  });


  it('should sortTaskByQueue', () => {
    const arr = '   [  ' +
      '     {  ' +
      '       "date": "2019-03-08T09:50:00+00:00",   ' +
      '       "id": 1.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 5.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:50:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdasd"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-08T09:50:00+00:00",   ' +
      '       "id": 2.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 4.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:50:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdsad"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-08T09:51:00+00:00",   ' +
      '       "id": 3.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 3.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "assadads"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-08T09:51:00+00:00",   ' +
      '       "id": 4.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 2.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdasd"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-08T09:51:00+00:00",   ' +
      '       "id": 5.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 1.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdsad"  ' +
      '     }  ' +
      '  ]  ';
    component.objects = JSON.parse(arr);
    component.sortTaskByQueue(component.objects);
    expect(component.objects[0].queue).toBe(1);
    expect(component.objects[1].queue).toBe(2);
    expect(component.objects[2].queue).toBe(3);
    expect(component.objects[3].queue).toBe(4);
    expect(component.objects[4].queue).toBe(5);

  });

  it('should sortTaskByDate', () => {
    const arr = '   [  ' +
      '     {  ' +
      '       "date": "2019-03-04T09:50:00+00:00",   ' +
      '       "id": 1.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 5.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:50:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdasd"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-07T09:50:00+00:00",   ' +
      '       "id": 2.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 4.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:50:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdsad"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-06T09:51:00+00:00",   ' +
      '       "id": 3.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 3.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "assadads"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-08T09:51:00+00:00",   ' +
      '       "id": 4.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 2.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdasd"  ' +
      '     },   ' +
      '     {  ' +
      '       "date": "2019-03-04T09:51:00+00:00",   ' +
      '       "id": 5.0,   ' +
      '       "id_project": null,   ' +
      '       "id_user": 1.0,   ' +
      '       "priority": 1.0,   ' +
      '       "queue": 1.0,   ' +
      '       "reminder": false,   ' +
      '       "reminding_time": "2019-03-08T09:51:00+00:00",   ' +
      '       "status": false,   ' +
      '       "title": "asdsad"  ' +
      '     }  ' +
      '  ]  ';
    component.objects = JSON.parse(arr);
    component.sortTaskByDate(component.objects);
    expect(new Date(component.objects[1].date).getTime() > new Date(component.objects[0].date).getTime() ).toBeTruthy();
    expect(new Date(component.objects[2].date).getTime() > new Date(component.objects[1].date).getTime() ).toBeTruthy();
    expect(new Date(component.objects[3].date).getTime() > new Date(component.objects[2].date).getTime() ).toBeTruthy();
    expect(new Date(component.objects[4].date).getTime() > new Date(component.objects[3].date).getTime() ).toBeTruthy();

  });
  afterEach(() => {
  });



});
