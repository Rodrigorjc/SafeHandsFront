import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAcontecimientoOngComponent } from './crear-acontecimiento-ong.component';

describe('CrearAcontecimientoOngComponent', () => {
  let component: CrearAcontecimientoOngComponent;
  let fixture: ComponentFixture<CrearAcontecimientoOngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAcontecimientoOngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAcontecimientoOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
