import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) {
    localStorage.getItem('token');

}
httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',
        'Authorization': localStorage.getItem('token')
    })
};
private static _handleError(e: HttpErrorResponse | any) {
    return throwError(e.message || 'ERROR');
}

getObjects(url: string): Observable<any> {
    return this.http.get(url, this.httpOptions); // .catch(DBAPI._handleError);
}
addObjects(url: string, object: any) {

    return this.http.post<any>(url, object, this.httpOptions);
}
updateObjects(url: string, object: any) {

    return this.http.put<any>(url, object, this.httpOptions);
}
removeObject(url: string) {

    return this.http.delete<any>(url, this.httpOptions);
}

}
