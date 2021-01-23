import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(event:any) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#login').value;
    const password = target.querySelector('#password').value
    console.log(username);
    console.log(password);

    this.Auth.getUserDetails(username, password);
  }
  
}
