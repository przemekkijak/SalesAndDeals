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
  displayedColumns: string[] = ['shop','noteInfo','noteAuthor','noteContent','actions'];
  notes: any = [];
  notesData = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  
  loaded = false;

  constructor(private fetch: FetchService, private dialog: MatDialog) { }


  ngOnInit(): void { 
    this.fetch.getAllNotes().subscribe(res => {
      this.notes = res;
      this.notes.sort((a,b) => a.createdAt.localeCompare(b.createdAt)).reverse();
      this.notesData.data = this.notes;
      this.loaded = true;
    });
  }

}
