import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularAcontecimientoProductosComponent } from './vincular-acontecimiento-productos.component';

describe('VincularAcontecimientoProductosComponent', () => {
  let component: VincularAcontecimientoProductosComponent;
  let fixture: ComponentFixture<VincularAcontecimientoProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VincularAcontecimientoProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VincularAcontecimientoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
