import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../_models/note';


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

  getResultsForShop(shopId: number) {
    return this.http.get(`/api/results/forShop/${shopId}`);
  }

  // notes

  getNotesForShop(shopId: number) {
    return this.http.get(`/api/shopNotes/getNotesForShop/${shopId}`); 
  }

  addNoteForShop(note: Note) {
    return this.http.post('/api/shopNotes/addNote', note);
  }

  getAllNotes() {
    return this.http.get('/api/shopNotes/')
  }

  // executions 
  getExecutionsForShop(shopId: number) {
    return this.http.get(`/api/executions/${shopId}`);
  }

  //scrapers view 
  getScrapersTodo(userId: number) {
    return this.http.get(`/api/scrapers/todo/${userId}`);
  }

}
