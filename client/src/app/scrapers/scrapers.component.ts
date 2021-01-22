import { Component, OnInit } from '@angular/core';
import {Scraper} from '../scraper';
@Component({
  selector: 'app-scrapers',
  templateUrl: './scrapers.component.html',
  styleUrls: ['./scrapers.component.scss']
})
export class ScrapersComponent implements OnInit {

  scraper: Scraper = {
    id: 1,
    name: "Carrefour",
    country: "Poland"
  };
  
  constructor() { }

  
  ngOnInit(): void {
  }

}
