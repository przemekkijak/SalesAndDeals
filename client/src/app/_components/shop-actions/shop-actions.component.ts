import { Component, Input, OnInit } from '@angular/core';
import { FetchService } from 'src/app/_services/fetch.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {MatMenuItem} from '@angular/material/menu';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ShopNotesComponent } from '../shop-notes/shop-notes.component';

@Component({
  selector: 'app-shop-actions',
  templateUrl: './shop-actions.component.html',
  styleUrls: ['./shop-actions.component.scss']
})
export class ShopActionsComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private fetch: FetchService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  @Input() shopId: number;
  @Input() assignedTo: number;
  @Input() robotState: string;

  user = this.tokenStorage.getUser();
  users = this.tokenStorage.getUsers();

  openNotes() {
    this.dialog.open(ShopNotesComponent, {data: {shopId: this.shopId},
    });
  }

  assignToUser(user: MatMenuItem) {
    var userData = this.users.filter(u => u.id == user['id']);
    this.fetch.assignTo(user['id'], this.shopId).subscribe(() => {
      this.showMessage(`Assigned scraper to ${userData[0].username}`, 'Close')
    });
  };

  assignToMe() {
    this.fetch.assignTo(this.user['id'], this.shopId).subscribe(() => {
      this.showMessage('Assigned scraper to myself', 'Close');
    })
  }

  markAsExecuted() {
    this.fetch.changeState(this.shopId, "EXECUTED").subscribe(() => {
      this.showMessage('Scraper marked as executed', 'Close')
    })
  }

  markAsCantDo() {
    this.fetch.changeState(this.shopId, "CANTDOTHIS").subscribe(() => {
      this.showMessage('Scraper marked as - cant do this -', 'Close');
    })
  }

  markAsSuccess() {
    this.fetch.changeState(this.shopId, "SUCCESS").subscribe(() => {
      this.showMessage('Scraper marked as Success', 'Close');
    })
  }

  markAsNoOffer() {
    this.fetch.changeState(this.shopId, "NOOFFER").subscribe(() => {
      this.showMessage('Scraper marked as No Offer', 'Close');
    })
  }

  markAsStillNoOffer() {
    this.fetch.changeState(this.shopId, "STILLNOOFFER").subscribe(() => {
      this.showMessage('Scraper marked as Still no offer', 'Close');
    })
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000});
  }

  ngOnInit(): void {
  }

}
