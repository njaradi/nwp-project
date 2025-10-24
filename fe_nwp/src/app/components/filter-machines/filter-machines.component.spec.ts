import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMachinesComponent } from './filter-machines.component';

describe('FilterMachinesComponent', () => {
  let component: FilterMachinesComponent;
  let fixture: ComponentFixture<FilterMachinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterMachinesComponent]
    });
    fixture = TestBed.createComponent(FilterMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
