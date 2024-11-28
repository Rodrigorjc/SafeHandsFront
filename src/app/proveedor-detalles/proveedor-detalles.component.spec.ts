import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorDetallesComponent } from './proveedor-detalles.component';

describe('ProveedorDetallesComponent', () => {
  let component: ProveedorDetallesComponent;
  let fixture: ComponentFixture<ProveedorDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
