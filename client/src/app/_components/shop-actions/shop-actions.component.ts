import { Component, Input, OnInit } from '@angular/core';
import { FetchService } from 'src/app/_services/fetch.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {MatMenuItem} from '@angular/material/menu';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-actions',
  templateUrl: './shop-actions.component.html',
  styleUrls: ['./shop-actions.component.scss']
})
export class ShopActionsComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private fetch: FetchService, private snackBar: MatSnackBar) { }

  @Input() shopId: number;
  @Input() assignedTo: number;
  @Input() robotState: string;

  user = this.tokenStorage.getUser();
  users = this.tokenStorage.getUsers();


  assignToUser(user: MatMenuItem) {
    var userData = this.users.filter(u => u.id == user['id']);
    this.fetch.assignTo(user['id'], this.shopId).subscribe(() => {
      this.showMessage(`Przypisano scraper do uzytkownika ${userData[0].username}`, "Zamknij")
    });
  };

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000});
  }

  ngOnInit(): void {
  }

}
