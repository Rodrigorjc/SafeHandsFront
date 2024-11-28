import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcontecimientoDetallesComponent } from './acontecimiento-detalles.component';

describe('AcontecimientoDetallesComponent', () => {
  let component: AcontecimientoDetallesComponent;
  let fixture: ComponentFixture<AcontecimientoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcontecimientoDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcontecimientoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
