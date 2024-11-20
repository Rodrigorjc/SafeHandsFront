import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngAsociarAcontecimientoComponent } from './ong-asociar-acontecimiento.component';

describe('OngAsociarAcontecimientoComponent', () => {
  let component: OngAsociarAcontecimientoComponent;
  let fixture: ComponentFixture<OngAsociarAcontecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngAsociarAcontecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngAsociarAcontecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
