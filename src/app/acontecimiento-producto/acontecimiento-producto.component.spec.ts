import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcontecimientoProductoComponent } from './acontecimiento-producto.component';

describe('AcontecimientoProductoComponent', () => {
  let component: AcontecimientoProductoComponent;
  let fixture: ComponentFixture<AcontecimientoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcontecimientoProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcontecimientoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
