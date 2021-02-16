import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedScrapersComponent } from './tagged-scrapers.component';

describe('TaggedScrapersComponent', () => {
  let component: TaggedScrapersComponent;
  let fixture: ComponentFixture<TaggedScrapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggedScrapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedScrapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
