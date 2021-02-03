import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScrapersComponent } from './my-scrapers.component';

describe('MyScrapersComponent', () => {
  let component: MyScrapersComponent;
  let fixture: ComponentFixture<MyScrapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyScrapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyScrapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
