import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarProveedorComponent } from './validar-proveedor.component';

describe('ValidarProveedorComponent', () => {
  let component: ValidarProveedorComponent;
  let fixture: ComponentFixture<ValidarProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarProveedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
