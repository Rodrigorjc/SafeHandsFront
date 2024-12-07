import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcontecimientoAdminComponent } from './acontecimiento-admin.component';

describe('AcontecimientoAdminComponent', () => {
  let component: AcontecimientoAdminComponent;
  let fixture: ComponentFixture<AcontecimientoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcontecimientoAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcontecimientoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
