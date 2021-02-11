import { Component, Input, OnInit } from '@angular/core';
import { FetchService } from 'src/app/_services/fetch.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {MatMenuItem} from '@angular/material/menu';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ShopNotesComponent } from '../shop-notes/shop-notes.component';
import { CreateTagComponent } from './create-tag/create-tag.component';
import { ShopActionsData } from 'src/app/_helpers/interfaces';


enum State {
  Executed = "EXECUTED",
  Cantdothis = "CANTDOTHIS",
  Success = "SUCCESS",
  Nooffer = "NOOFFER",
  Stillnooffer = "STILLNOOFFER",
  Ok = "OK",
  Todo = "TODO",
  Hard = "HARD"
}


@Component({
  selector: 'app-shop-actions',
  templateUrl: './shop-actions.component.html',
  styleUrls: ['./shop-actions.component.scss']
})

export class ShopActionsComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private fetch: FetchService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  @Input() data: ShopActionsData;
  @Input() parent: string;
  ScraperState = State;

  user = this.tokenStorage.getUser();
  users = this.tokenStorage.getUsers();


  openNotes() {
    this.dialog.open(ShopNotesComponent, {data: {shopId: this.data.shopId}});
  }

  addTag() {
    this.dialog.open(CreateTagComponent, {data: {shopId: this.data.shopId}});
  }

  assignToUser(user: MatMenuItem) {
    var userData = this.users.filter(u => u.id == user['id']);
    this.fetch.assignTo(user['id'], this.data.shopId).subscribe(() => {
      this.showMessage(`Assigned scraper to ${userData[0].username}`, 'Close');
      if(this.parent == 'scrapers') {
        window.location.reload();
      }
    });
  }

  assignToMe() {
    this.fetch.assignTo(this.user['id'], this.data.shopId).subscribe(() => {
      this.showMessage('Assigned scraper to myself', 'Close');
      if(this.parent == 'scrapers') {
        window.location.reload();
      }
    })
  }

  markScraperAs(state: State) {
    this.fetch.changeState(this.data.shopId, state, this.user.username).subscribe(() => {
      this.showMessage(`Scraper marked as - ${state} - `, 'Close');
      if(this.parent == 'scrapers') {
        window.location.reload();
      }
    })
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000});
  }

  ngOnInit(): void {
  }

}

