import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailingsComponent } from './failings.component';

describe('FailingsComponent', () => {
  let component: FailingsComponent;
  let fixture: ComponentFixture<FailingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
