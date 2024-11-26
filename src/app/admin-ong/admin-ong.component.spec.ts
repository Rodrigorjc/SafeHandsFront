import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOngComponent } from './admin-ong.component';

describe('AdminOngComponent', () => {
  let component: AdminOngComponent;
  let fixture: ComponentFixture<AdminOngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
