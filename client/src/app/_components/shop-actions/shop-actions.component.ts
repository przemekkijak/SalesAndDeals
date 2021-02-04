import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-actions',
  templateUrl: './shop-actions.component.html',
  styleUrls: ['./shop-actions.component.scss']
})
export class ShopActionsComponent implements OnInit {

  constructor() { }

  @Input() shopId: number;

  ngOnInit(): void {
  }

}
