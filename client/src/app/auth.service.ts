import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUserDetails(username:string, password:string) {
    return this.http.post('/api/login', 
    {
      username,
      password
    },
    {responseType: 'text'},
    ).subscribe(res => {
      console.log(res);
    })
  }
}
