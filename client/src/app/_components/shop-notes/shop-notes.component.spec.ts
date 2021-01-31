import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNotesComponent } from './shop-notes.component';

describe('ShopNotesComponent', () => {
  let component: ShopNotesComponent;
  let fixture: ComponentFixture<ShopNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
