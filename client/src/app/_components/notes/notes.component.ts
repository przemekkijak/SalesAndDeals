import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { FetchService } from 'src/app/_services/fetch.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['shop','noteInfo','noteContent'];
  notesData: any = new MatTableDataSource<any>();


  constructor(private fetch: FetchService, private dialog: MatDialog) { }

  ngOnInit(): void { 
    this.fetch.getAllNotes().subscribe(res => {
      this.notesData = res;
      this.notesData.sort((a,b) => a.createdAt.localeCompare(b.createdAt)).reverse();

    });
    console.log('notes');
  }

}
