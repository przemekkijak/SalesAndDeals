import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  noteContent: string;
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private fetch: FetchService, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getNotes();
    this.form = this.formBuilder.group({
      content: [null, Validators.required]
    });
  }



  getNotes() {
    this.fetch.getNotesForShop(this.data.shopId).subscribe(res => {
      this.notes = res;
      this.notes.reverse();
    })
  }

  addNote(noteContent) {
    let ZeroPrefix = (dateField: number) => {
      if(dateField < 10) {
        return `0${dateField}`
      } else {
        return dateField;
      }
    }
    var now = new Date();
    now.setHours(now.getHours()+1)

    var note = new Note(this.data.shopId, this.tokenStorage.getUser().username, now, noteContent);
    this.fetch.addNoteForShop(note).subscribe(res => {
      this.getNotes();
      this.form.reset();
    })
  }

}
