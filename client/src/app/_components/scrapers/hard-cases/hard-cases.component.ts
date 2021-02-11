import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { FetchService } from 'src/app/_services/fetch.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-hard-cases',
  templateUrl: './hard-cases.component.html',
  styleUrls: ['./hard-cases.component.scss']
})
export class HardCasesComponent implements OnInit {
  displayedColumns: string[] = ['name','lastExecuted','actions'];
  scrapers: any = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private fetch: FetchService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.fetch.getScrapers(0, "HARD").subscribe(res => {
      this.scrapers = res;
      this.scrapers.sort((a,b) => a.lastExecuted.localeCompare(b.lastExecuted)).reverse();
      this.dataSource = this.scrapers;
      console.log(this.scrapers);
    })
  }
}
