import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion'; 
import { FetchService } from 'src/app/_services/fetch.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
  viewProviders: [MatExpansionPanel]
  
})
export class AdminOverviewComponent implements OnInit {

  scrapers: any = [];
  users: any = this.tokenStorage.getUsers();

  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private fetch: FetchService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    console.log(this.users);
  }

}
