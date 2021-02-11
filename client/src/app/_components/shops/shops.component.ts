import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FetchService} from '../../_services/fetch.service';
import { ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort'; 
import {MatDialog} from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Country, Shop } from 'src/app/_helpers/interfaces';



@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})

export class ShopsComponent implements OnInit {
  displayedColumns: string[] = ['rank','name','category','lastExecuted','activeOffers','actions'];
  countries: Country[];
  shops: Shop[];
  dataSource = new MatTableDataSource<any>();
  selectedCountry: number = 0;
  users = this.tokenStorage.getUsers();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fetch: FetchService, private dialog: MatDialog, private tokenStorage: TokenStorageService) { }
  

  getUsername(userId: number) {
    if(userId == 0) {
      return 'Not assigned';
    } else {
    var user = this.users.filter(u => u.id == userId);
    return user[0]['username'];
    }
  }

  changeCountry() {
    this.fetch.getShopsForCountry(this.selectedCountry).subscribe(res => {
      this.shops = res;
      this.dataSource.data = this.shops;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit(): void {
    this.fetch.getCountries().subscribe(res => {
      this.countries = res;
    });
  }
}


