import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../_models/note';
import { Country, Shop, Tag } from '../_helpers/interfaces';


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
    return this.http.get<Country[]>('/api/countries');
  }

  getShopsForCountry(countryId: number) {
    return this.http.get<Shop[]>(`/api/scrapers/forCountry/${countryId}`);
  }

  getResultsForShop(shopId: number) {
    return this.http.get(`/api/scrapers/forShop/${shopId}`);
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
  changeState(shopId: number, state: string, modifiedByName: string) {
    return this.http.put(`/api/scrapers/changeState/${shopId}/${state}/${modifiedByName}`, {});
  }
  getTags() {
    return this.http.get<Tag[]>('/api/scrapers/tags');
  }
  setTag(shopId: number, tagName: string) {
    return this.http.put(`/api/scrapers/tag/${shopId}/${tagName}`, {});
  }
  createTag(name: string, description: string, color: string, canWork: number) {
    return this.http.post('api/scrapers/tag', {
      name,
      description,
      color,
      canWork
    });
  }

}
