import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FetchService } from 'src/app/_services/fetch.service';

@Component({
  selector: 'app-shop-notes',
  templateUrl: './shop-notes.component.html',
  styleUrls: ['./shop-notes.component.scss']
})
export class ShopNotesComponent implements OnInit {

  notes: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data, private fetch: FetchService) { }

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

}
