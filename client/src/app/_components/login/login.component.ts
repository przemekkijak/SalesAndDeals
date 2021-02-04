import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {Router} from '@angular/router';
import { FetchService } from 'src/app/_services/fetch.service';

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
username = "";

  constructor(private auth: AuthService, private tokenStorage: TokenStorageService, private router: Router, private fetch: FetchService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser().username;
    }
  }

  onSubmit(): void {
    const {username, password} = this.form;

    this.auth.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.username = data.username;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/dashboards'])
        .then(() => {
          window.location.reload();
        })
        .then(() => {
          var role = this.tokenStorage.getUser().role;
          console.log(role);
          if(role == "admin") {
            this.fetch.getUsers().subscribe(res => {
              this.tokenStorage.saveUsers(res);
            })
          }
        })
      },
      err => {
        this.isLoginFailed = true;
      }
    )
  }

}
