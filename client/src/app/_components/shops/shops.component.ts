import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FetchService} from '../../_services/fetch.service';
import { ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort'; 
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ShopNotesComponent} from '../shop-notes/shop-notes.component';



@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})

export class ShopsComponent implements OnInit {
  displayedColumns: string[] = ['rank','name','category','lastExecuted','activeOffers', 'notes','inputUrl', 'dexiRobot'];
  countries: any = [];
  shops: Shop[] = [];
  dataSource = new MatTableDataSource<any>();
  selectedCountry: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fetch: FetchService, private dialog: MatDialog) { }
  
  changeCountry() {
    this.fetch.getShopsForCountry(this.selectedCountry).subscribe(res => {
      console.log(res);
      this.dataSource.data = this.shops;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  openNotes(shopId: number) {
    this.dialog.open(ShopNotesComponent, {data: {shopId: shopId},
    });
  }

  ngOnInit(): void {
    this.fetch.getCountries().subscribe(res => {
      this.countries = res;
    });
  }
}

export interface Shop {
  id: number;
  name: string;
  countryId: number;
  activeOffers: number;
  lastModified: string;
  lastExecuted: string;
  assignedTo: number;
  rank: number;
  category: string;
  inputUrl: string;
}

