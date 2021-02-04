import { Component, Input, OnInit } from '@angular/core';
import { FetchService } from 'src/app/_services/fetch.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-shop-actions',
  templateUrl: './shop-actions.component.html',
  styleUrls: ['./shop-actions.component.scss']
})
export class ShopActionsComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private fetch: FetchService) { }

  @Input() shopId: number;
  @Input() assignedTo: number;
  @Input() robotState: string;

  user = this.tokenStorage.getUser();
  users = this.tokenStorage.getUsers();



  ngOnInit(): void {
  }

}
