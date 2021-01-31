import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FetchService} from '../../_services/fetch.service';
import { ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort'; 



@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  displayedColumns: string[] = ['rank','name','category','lastExecuted','lastModified', 'activeOffers','notes', 'inputUrl'];
  countries: any = [];
  shops: any = [];
  dataSource = new MatTableDataSource<any>();
  selectedCountry: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fetch: FetchService) { }
  
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

