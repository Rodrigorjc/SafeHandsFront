import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovilidadProveedoresComponent } from './movilidad-proveedores.component';

describe('MovilidadProveedoresComponent', () => {
  let component: MovilidadProveedoresComponent;
  let fixture: ComponentFixture<MovilidadProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovilidadProveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovilidadProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
