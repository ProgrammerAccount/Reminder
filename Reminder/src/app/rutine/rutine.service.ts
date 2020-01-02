import { Injectable } from '@angular/core';
import { URL } from '../ApiUrls'
import { AbstractService } from '../abscract.service';
import { APIService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RutineService extends AbstractService {
  Sort(): void {
  }

  constructor(private API: APIService) {
    super(API, URL.API_RUTINES);
  }

  Add(rutines) {
    return this.API.addObjects(URL.API_RUTINES, rutines)
  }

}
