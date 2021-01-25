import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import {User} from '../_models/user';

interface ISUser {
  id:      number;
  username:     string;
  role:      string;
  token: string;
}

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
    return this.http.post('/api/login', {username, password})
    .pipe(map(user => {
      localStorage.setItem('sndData', JSON.stringify(user));
      // this.userSubject.next(user);
      return user;
    }));
  };
}

// login(username: string, password: string) {
//   return this.http.post('/api/login', {username, password})
//   .subscribe({
//     next: user => {
//       localStorage.setItem('sndData', JSON.stringify(user));
//       return user;
//     },
//     error: error => {
//       return error;
//     }
//   });