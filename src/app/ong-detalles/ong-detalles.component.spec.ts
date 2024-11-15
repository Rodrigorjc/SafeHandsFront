import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngDetallesComponent } from './ong-detalles.component';

describe('OngDetallesComponent', () => {
  let component: OngDetallesComponent;
  let fixture: ComponentFixture<OngDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
