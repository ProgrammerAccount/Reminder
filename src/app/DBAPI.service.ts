
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'http://localhost:5000';
@Injectable()

export class DBAPI{
    constructor(private http: HttpClient){}
    private static _handleError(e: HttpErrorResponse| any)
    {
        return observableThrowError(e.message || 'ERROR');
    }
    getObjects(router: string): Observable<any>
    {
        return this.http.get(`${API_URL}/${router}`); // .catch(DBAPI._handleError);
    }
    addObjects(url: string, object: any)
    {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
        };
        return this.http.post<any>(`${API_URL}/${url}`, object, httpOptions);
    }
    updateObjects(url: string, object: any)
    {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
        };
        return this.http.put<any>(`${API_URL}/${url}`, object, httpOptions);
    }
    removeObject(url: string)
    {

        return this.http.delete<any>(`${API_URL}/${url}`);
    }

}
