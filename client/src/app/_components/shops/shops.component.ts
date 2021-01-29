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
  selectedCountry: number = 0;
  selectedShop: number = 0;



  constructor(private fetch: FetchService) { }
  
  changeCountry() {
    console.log(this.selectedCountry);
    this.fetch.getShopsForCountry(this.selectedCountry).subscribe(res => {
      this.shops = res;
      console.log(this.shops);
    })
  }

  changeShop() {
    console.log('shop change');
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


