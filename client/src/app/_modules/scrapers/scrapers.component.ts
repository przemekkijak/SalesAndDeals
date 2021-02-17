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
    {name: 'My scrapers', route: 'myscrapers'},
    {name: 'Failings', route: 'failings'},
    {name: 'No offer', route: 'nooffer'},
    {name: 'Hard cases', route: 'hard'}
  ];
  admin = {name: 'Admin', route: 'admin'}
  route = this.router.url.split('/');
  activeLink = this.route[this.route.length-1];

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.user.role == 'admin') {
      this.router.navigate(['scrapers/admin']);
      this.activeLink = this.admin.name;
    }
    console.log('scrapers loaded');
  }

}
