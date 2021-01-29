import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get('/api/countries');
  }

  getShopsForCountry(countryId: number) {
    return this.http.get(`/api/shops/forCountry/${countryId}`);
  }
}
