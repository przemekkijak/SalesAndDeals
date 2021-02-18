import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-scrapers-admin',
  templateUrl: './scrapers-admin.component.html',
  styleUrls: ['./scrapers-admin.component.scss']
})
export class ScrapersAdminComponent implements OnInit {

  constructor() { }

  links = [
    {name: 'Main', route: 'main'},
    {name: 'Overview', route: 'overview'},
  ];
  activeLink = this.links[0];

  ngOnInit(): void {
  }

}
