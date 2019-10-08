import { TestBed, async } from '@angular/core/testing';
import { URL } from './ApiUrls'
import { APIService } from './api.service';
import { HttpClientModule, } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('APIService', () => {
  let httpMock: HttpTestingController;
  let API: APIService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [APIService]
    }).compileComponents();
  }));
  beforeEach(() => {
    API = TestBed.get(APIService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should return expected tasks (HttpClient called once)', async(() => {
    const expectedTask = [
      {
        'date': '2033-08-17T10:27:00+00:00',
        'id': 33.0,
        'id_project': 0.0,
        'id_user': 1.0,
        'priority': 1.0,
        'queue': 0.0,
        'reminder': false,
        'reminding_time': '2019-01-15T11:27:00+00:00',
        'status': false,
        'title': 'Title2'
      }];

    API.getObjects(URL.API_TASK).subscribe(
      tasks => expect(tasks).toEqual(expectedTask)
    );
    const req = httpMock.expectOne(URL.API_TASK);
    req.flush(expectedTask);
    expect(req.request.method).toBe('GET');
    httpMock.verify();

  }));

  it('should add tasks (HttpClient called once)', async(() => {
    const expectedTask = [
      {
        'date': '2033-08-17T10:27:00+00:00',
        'id': 33.0,
        'id_project': 0.0,
        'id_user': 1.0,
        'priority': 1.0,
        'queue': 0.0,
        'reminder': false,
        'reminding_time': '2019-01-15T11:27:00+00:00',
        'status': false,
        'title': 'Title2'
      }];
    API.addObjects(URL.API_TASK, expectedTask).subscribe(
      tasks => expect(tasks).toEqual(expectedTask)
    );
    const req = httpMock.expectOne(URL.API_TASK);
    req.flush(expectedTask);
    httpMock.verify();
    expect(req.request.method).toBe('POST');
  }));

  it('should return expected tasks (HttpClient called once)', async(() => {

    API.removeObject(URL.API_TASK + '/3').subscribe(
      tasks => expect(tasks).toEqual('')
    );
    const req = httpMock.expectOne(URL.API_TASK + '/3');
    httpMock.verify();
    expect(req.request.method).toBe('DELETE');
  }));

  it('should Update tasks (HttpClient called once)', async(() => {
    const expectedTask = [
      {
        'date': '2033-08-17T10:27:00+00:00',
        'id': 33.0,
        'id_project': 0.0,
        'id_user': 1.0,
        'priority': 1.0,
        'queue': 0.0,
        'reminder': false,
        'reminding_time': '2019-01-15T11:27:00+00:00',
        'status': false,
        'title': 'Title2'
      }];
    API.updateObjects(URL.API_TASK, expectedTask).subscribe(
      tasks => expect(tasks).toEqual(expectedTask)
    );
    const req = httpMock.expectOne(URL.API_TASK);
    req.flush(expectedTask);
    httpMock.verify();
    expect(req.request.method).toBe('PUT');
  }));
});
