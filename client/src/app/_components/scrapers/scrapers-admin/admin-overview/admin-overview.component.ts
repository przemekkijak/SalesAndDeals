import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion'; 
import { FetchService } from 'src/app/_services/fetch.service';


@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
  viewProviders: [MatExpansionPanel]
  
})
export class AdminOverviewComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private fetch: FetchService) { }

  ngOnInit(): void {
  }

}
