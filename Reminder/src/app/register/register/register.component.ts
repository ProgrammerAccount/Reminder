import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private regServ: RegisterService) { }

  RegisterResult() {
    if (this.regServ.message == 'Sukcess') {
      window.location.href = '/login';
    }

    return this.regServ.message;
  }
  ngOnInit() {
  }

}
