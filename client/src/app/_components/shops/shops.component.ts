import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FetchService} from '../../_services/fetch.service';


@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  displayedColumns: string[] = ['name','logo','results'];
  
  countries: any = [];
  shops: any = [];
  results: any = [];

  selectedCountry: number = 0;
  selectedShop: number = 0;



  constructor(private fetch: FetchService) { }
  
  changeCountry() {
    this.fetch.getShopsForCountry(this.selectedCountry).subscribe(res => {
      this.shops = res;
    })
  }

  changeShop() {
    this.fetch.getResultsForShop(this.selectedShop).subscribe(res => {
      this.results = res;
      console.log(this.results);
    })
  }

  ngOnInit(): void {
    this.fetch.getCountries().subscribe(res => {
      this.countries = res;
    });
  }

}



export interface ScraperData {
  name: string;
  logo: string;
  results: number;
}

export interface Country {
  name: string;
  id: number;
}


