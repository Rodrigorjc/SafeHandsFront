import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProveedoresComponent } from './register-proveedores.component';

describe('RegisterProveedoresComponent', () => {
  let component: RegisterProveedoresComponent;
  let fixture: ComponentFixture<RegisterProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
