import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../ApiUrls';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  public message: String;
  public status: number;
  register(email, pass, passv2) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    this.http.post(URL.API_REGISTER, { 'email': email, 'pass': pass, 'passv2': passv2 }, { headers, responseType: 'text' }).subscribe((data: any) => {
      this.status = data.httpStatus;
      
      this.message = data;
    });
  }

}
