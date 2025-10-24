import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesPageComponent } from './machines-page.component';

describe('MachinesPageComponent', () => {
  let component: MachinesPageComponent;
  let fixture: ComponentFixture<MachinesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachinesPageComponent]
    });
    fixture = TestBed.createComponent(MachinesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
