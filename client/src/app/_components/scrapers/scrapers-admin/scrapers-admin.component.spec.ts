import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapersAdminComponent } from './scrapers-admin.component';

describe('ScrapersAdminComponent', () => {
  let component: ScrapersAdminComponent;
  let fixture: ComponentFixture<ScrapersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapersAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
