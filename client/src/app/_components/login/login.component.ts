import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
form: any = {
  username: null,
  password: null
};

isLoggedIn = false;
isLoginFailed = false;
errorMessage = "";
UID = 0;
username = "";

  constructor(private auth: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const {username, password} = this.form;

    this.auth.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.Token);
        this.tokenStorage.saveUser(data);

        console.log(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    )
  }

}
