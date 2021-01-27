import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';


@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {

  username = "";
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.tokenStorage.getUser()) {
      this.username = this.tokenStorage.getUser().username;
    }
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
