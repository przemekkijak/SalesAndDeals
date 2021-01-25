import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../_services/account.service';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {

  username = this.user.username;
  constructor(
    private user: AccountService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('sndData');
    location.reload();
    this.router.navigate(['/login']);
  }

}
