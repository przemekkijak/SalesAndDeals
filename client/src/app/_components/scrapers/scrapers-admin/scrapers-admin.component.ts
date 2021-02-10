import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { FetchService } from 'src/app/_services/fetch.service';

@Component({
  selector: 'app-scrapers-admin',
  templateUrl: './scrapers-admin.component.html',
  styleUrls: ['./scrapers-admin.component.scss']
})
export class ScrapersAdminComponent implements OnInit {
  displayedColumns: string[] = ['name','lastExecuted','scraper', 'actions'];
  success: any = [];
  cant: any = [];
  successDataSource = new MatTableDataSource<any>();
  cantDataSource = new MatTableDataSource<any>();


  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private fetch: FetchService) { }

  ngOnInit(): void {
    this.fetch.getScrapers(0, "SUCCESS").subscribe(res => {
      this.success = res;
      this.success.sort((a,b) => a.name.localeCompare(b.name));
      this.successDataSource = this.success;
      console.log(this.success);
    })
    this.fetch.getScrapers(0, "CANTDOTHIS").subscribe(res => {
      this.cant = res;
      this.cantDataSource = this.cant;

    })
  }
}
