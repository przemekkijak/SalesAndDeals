import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import {User} from '../_models/user';

@Injectable({providedIn: 'root'})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('sndData') || '{}'));
    this.user = this.userSubject.asObservable();
   }

   public get userId(): number {
     return this.userSubject.value.id;
   }

   public get username(): string {
     return this.userSubject.value.username;
   }

   login(username: string, password: string) {
    this.http.post('/api/login', {username, password})
    .subscribe({
      next: data => {
        localStorage.setItem('sndData', JSON.stringify(data));
        this.router.navigate(['/']);
      },
      error: error => {
        console.log(error);
      }
    })
  };
}
