import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { FetchService } from 'src/app/_services/fetch.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-todo-scrapers',
  templateUrl: './todo-scrapers.component.html',
  styleUrls: ['./todo-scrapers.component.scss']
})
export class TodoScrapersComponent implements OnInit {
  displayedColumns: string[] = ['name','lastExecuted','lastNote','actions'];
  scrapers: any = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private fetch: FetchService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.fetch.getScrapers(this.tokenStorage.getUser().id, "TODO").subscribe(res => {
      this.scrapers = res;
      this.scrapers.sort((a,b) => a.name.localeCompare(b.name));
      this.dataSource = this.scrapers;
      console.log(this.scrapers);
    })
  }
}
