import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessScrapersComponent } from './success-scrapers.component';

describe('SuccessScrapersComponent', () => {
  let component: SuccessScrapersComponent;
  let fixture: ComponentFixture<SuccessScrapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessScrapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessScrapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
