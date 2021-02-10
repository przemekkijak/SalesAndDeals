import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardCasesComponent } from './hard-cases.component';

describe('HardCasesComponent', () => {
  let component: HardCasesComponent;
  let fixture: ComponentFixture<HardCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
