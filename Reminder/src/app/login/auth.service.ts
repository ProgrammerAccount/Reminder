import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../ApiUrls';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (localStorage.getItem('token')) {
      return true;
    }
    window.location.href = 'login';
    return false;
  }

  constructor(private http: HttpClient) { }
  login(email: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http
      .post(URL.API_LOGIN, { email: email, password: password }, { headers, responseType: 'text'})
      .subscribe(data => {
        if (data !== 'False') {
          localStorage.setItem('token', data);
          window.location.href = '/';
        }
      });
  }
}
