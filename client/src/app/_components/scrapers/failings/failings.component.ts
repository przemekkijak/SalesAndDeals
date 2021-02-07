import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { FetchService } from 'src/app/_services/fetch.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-failings',
  templateUrl: './failings.component.html',
  styleUrls: ['./failings.component.scss']
})
export class FailingsComponent implements OnInit {
  displayedColumns: string[] = ['name','lastExecuted','actions'];
  scrapers: any = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private fetch: FetchService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.fetch.getScrapers(0, "FAILED").subscribe(res => {
      this.scrapers = res;
      this.dataSource = this.scrapers;
    })
  }
}
