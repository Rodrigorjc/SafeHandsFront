import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAcontecimientoComponent } from './info-acontecimiento.component';

describe('InfoAcontecimientoComponent', () => {
  let component: InfoAcontecimientoComponent;
  let fixture: ComponentFixture<InfoAcontecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoAcontecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoAcontecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
