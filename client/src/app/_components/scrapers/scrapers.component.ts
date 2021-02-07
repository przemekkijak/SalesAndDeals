import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-scrapers',
  templateUrl: './scrapers.component.html',
  styleUrls: ['./scrapers.component.scss']
})
export class ScrapersComponent implements OnInit {

  user = this.tokenStorage.getUser();

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

}
