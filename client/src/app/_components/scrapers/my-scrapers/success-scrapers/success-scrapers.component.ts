import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { FetchService } from 'src/app/_services/fetch.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-success-scrapers',
  templateUrl: './success-scrapers.component.html',
  styleUrls: ['./success-scrapers.component.scss']
})
export class SuccessScrapersComponent implements OnInit {
  displayedColumns: string[] = ['name','lastExecuted','actions'];
  scrapers: any = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private fetch: FetchService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.fetch.getScrapers(this.tokenStorage.getUser().id, "SUCCESS").subscribe(res => {
      this.scrapers = res;
      this.scrapers.sort((a,b) => a.name.localeCompare(b.name));
      this.dataSource = this.scrapers;
    })
  }
}
