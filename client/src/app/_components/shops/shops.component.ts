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
  selectedCountry: number = 0;
  selectedShop: number = 0;

  shops = [
    {id: 1, name: "Carrefour", results: 5, modifiedBy: "Przemek"},
    {id: 2, name: "Tesco", results: 3, modifiedBy: "Maciek"},
    {id: 3, name: "Biedronka", results: 3, modifiedBy: "Karolina"}
  ]

  constructor(private fetch: FetchService) { }
  
  changeShop() {
    // api get shops
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


