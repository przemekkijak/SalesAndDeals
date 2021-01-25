import { Component, OnInit } from '@angular/core';

import {AccountService} from '../../_services/account.service';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {

  username = this.user.username;
  constructor(private user: AccountService) { }

  ngOnInit(): void {
  }

}
