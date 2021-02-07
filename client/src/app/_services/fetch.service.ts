import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../_models/note';


@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  // get users (for admin only)
  getUsers() {
    return this.http.get('/api/users');
  }

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
  getScrapers(userId: number, state: string) {
    return this.http.get(`/api/scrapers/${userId}/${state}`);
  }

  // shop actions
  assignTo(userId: number, shopId: number) {
    return this.http.put(`/api/scrapers/assignTo/${userId}/${shopId}`, {});
  }
  changeState(shopId: number, state: string) {
    return this.http.put(`/api/scrapers/changeState/${shopId}/${state}`, {});
  }

}
