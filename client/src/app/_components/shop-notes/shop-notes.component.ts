import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FetchService } from 'src/app/_services/fetch.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {Note} from '../../_models/note';

@Component({
  selector: 'app-shop-notes',
  templateUrl: './shop-notes.component.html',
  styleUrls: ['./shop-notes.component.scss']
})
export class ShopNotesComponent implements OnInit {

  notes: any = [];
  noteContent: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data, private fetch: FetchService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.fetch.getNotesForShop(this.data.shopId).subscribe(res => {
      this.notes = res;
      this.notes.reverse();
      console.log(this.notes);
    })
  }

  addNote(noteContent) {
    var now = new Date();
    var createdAt = `${now.getUTCFullYear()}-${(now.getMonth() < 10) ? `0${now.getMonth()+1}` : now.getMonth()+1}-${(now.getDate() < 10) ? `0${now.getDate()}` : now.getDate()}T${now.getUTCHours()+1}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`;
    var note = new Note(this.data.shopId, this.tokenStorage.getUser().username, createdAt, noteContent);
    
    this.fetch.addNoteForShop(note).subscribe(res => {
      console.log(res);
    })
  }

}
