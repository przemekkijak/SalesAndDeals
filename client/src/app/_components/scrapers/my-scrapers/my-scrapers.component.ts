import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-scrapers',
  templateUrl: './my-scrapers.component.html',
  styleUrls: ['./my-scrapers.component.scss']
})
export class MyScrapersComponent implements OnInit {

  constructor() { }

  links = [
    {name: 'Todo', route: 'todo'},
    {name: 'Executed', route: 'executed'},
    {name: 'Success', route: 'success'}
  ];
  activeLink = this.links[0];

  ngOnInit(): void {
  }

}
