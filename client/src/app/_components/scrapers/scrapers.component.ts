import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-scrapers',
  templateUrl: './scrapers.component.html',
  styleUrls: ['./scrapers.component.scss']
})
export class ScrapersComponent implements OnInit {

  user = this.tokenStorage.getUser();
  links = [
    {name: 'My scrapers', route: 'todo'},
    {name: 'Failings', route: 'failings'},
    {name: 'No offer', route: 'nooffer'}
  ];
  admin = {name: 'Admin', route: 'admin'}
  activeLink = this.links[0];

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.user.role == 'admin') {
      this.router.navigate(['scrapers/admin']);
      this.activeLink = this.admin;
    }
  }

}
