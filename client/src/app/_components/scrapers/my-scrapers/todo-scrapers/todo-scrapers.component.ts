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
  displayedColumns: string[] = ['name','lastExecuted','notes','inputUrl','dexiRobot', 'dexiExecutions','markAs'];
  scrapers: any = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator


  constructor(private fetch: FetchService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.fetch.getScrapersTodo(this.tokenStorage.getUser().id).subscribe(res => {
      this.scrapers = res;
      this.dataSource = this.scrapers;
    })
  }

  openNotes(shopId: number) {
    console.log('notes');
  }

}
