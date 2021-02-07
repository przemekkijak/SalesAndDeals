import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FetchService} from '../../_services/fetch.service';
import { ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort'; 
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ShopNotesComponent} from '../shop-notes/shop-notes.component';
import { TokenStorageService } from 'src/app/_services/token-storage.service';



@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})

export class ShopsComponent implements OnInit {
  displayedColumns: string[] = ['rank','name','category','lastExecuted','activeOffers','actions'];
  countries: any = [];
  shops: any = [];
  dataSource = new MatTableDataSource<any>();
  selectedCountry: number = 0;
  users = this.tokenStorage.getUsers();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fetch: FetchService, private dialog: MatDialog, private tokenStorage: TokenStorageService) { }
  
  changeCountry() {
    this.fetch.getShopsForCountry(this.selectedCountry).subscribe(res => {
      this.shops = res;
      this.dataSource.data = this.shops;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }

  getUsername(userId: number) {
    if(userId == 0) {
      return 'Not assigned';
    } else {
    var user = this.users.filter(u => u.id == userId);
    return user[0]['username'];
    }
  }

  ngOnInit(): void {
    this.fetch.getCountries().subscribe(res => {
      this.countries = res;
    });
  }
}


