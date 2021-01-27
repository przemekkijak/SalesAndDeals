import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  displayedColumns: string[] = ['name','logo','results'];
  dataSource = new MatTableDataSource<ScraperData>(SCRAPER_DATA);
  countriesList = COUNTRIES;

  selectedCountryId = 0;
  constructor() { }

  ngOnInit(): void {
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

const COUNTRIES: Country[] = [
  {name: 'Argentina', id: 1},
  {name: 'Brasil', id: 2},
  {name: 'Poland', id: 3}
]

const SCRAPER_DATA: ScraperData[] = [
  {name: "Test", logo: "test logo", results: 5},
  {name: "Carrefour", logo: "carrefour", results: 3},
];
