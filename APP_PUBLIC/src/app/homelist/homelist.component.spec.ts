import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomelistComponent } from './homelist.component';

describe('HomelistComponent', () => {
  let component: HomelistComponent;
  let fixture: ComponentFixture<HomelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
