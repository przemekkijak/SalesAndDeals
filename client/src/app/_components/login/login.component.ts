import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../_services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private Account: AccountService) { }

  ngOnInit(): void {
  }

  loginUser(event:any) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#login').value;
    const password = target.querySelector('#password').value
    this.Account.login(username, password);
  }

}
