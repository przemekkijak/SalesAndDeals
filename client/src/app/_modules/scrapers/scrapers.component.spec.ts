import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapersComponent } from './scrapers.component';

describe('ScrapersComponent', () => {
  let component: ScrapersComponent;
  let fixture: ComponentFixture<ScrapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
