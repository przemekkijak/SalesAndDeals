import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatTableDataSource} from '@angular/material/table';
import { FetchService } from 'src/app/_services/fetch.service';
import { ShopNotesComponent } from '../shop-notes/shop-notes.component';
import {MatPaginator} from '@angular/material/paginator';



@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['shop','noteInfo','noteAuthor','noteContent','fullNotes','actions'];
  notesData: any = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  


  constructor(private fetch: FetchService, private dialog: MatDialog) { }


  openNotes(shopId: number) {
    this.dialog.open(ShopNotesComponent, {data: {shopId: shopId},
    });
  }

  ngOnInit(): void { 
    this.fetch.getAllNotes().subscribe(res => {
      this.notesData = res;
      this.notesData.sort((a,b) => a.createdAt.localeCompare(b.createdAt)).reverse();
    });
  }

}
