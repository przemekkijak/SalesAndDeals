import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitExecutionScrapersComponent } from './wait-execution-scrapers.component';

describe('WaitExecutionScrapersComponent', () => {
  let component: WaitExecutionScrapersComponent;
  let fixture: ComponentFixture<WaitExecutionScrapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitExecutionScrapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitExecutionScrapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
