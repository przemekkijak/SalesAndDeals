import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoScrapersComponent } from './todo-scrapers.component';

describe('TodoScrapersComponent', () => {
  let component: TodoScrapersComponent;
  let fixture: ComponentFixture<TodoScrapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoScrapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoScrapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
