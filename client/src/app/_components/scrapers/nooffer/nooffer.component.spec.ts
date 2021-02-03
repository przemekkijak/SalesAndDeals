import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoofferComponent } from './nooffer.component';

describe('NoofferComponent', () => {
  let component: NoofferComponent;
  let fixture: ComponentFixture<NoofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoofferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
