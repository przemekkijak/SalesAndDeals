import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag } from 'src/app/_helpers/interfaces';
import { FetchService } from 'src/app/_services/fetch.service';


@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.scss']
})
export class CreateTagComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private fetch: FetchService) { }

  tags: Tag[] = [];
  selectedTag: string;

  ngOnInit(): void {
    this.fetch.getTags().subscribe((res) => {
      this.tags = res;
    })
  }

  setTag(tagName: string) {
    console.log(tagName);
    this.fetch.setTag(this.data.shopId, tagName).subscribe(() => {
      window.location.reload();
    })
  }

}
