import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcontecimientoComponent } from './acontecimiento.component';

describe('AcontecimientoComponent', () => {
  let component: AcontecimientoComponent;
  let fixture: ComponentFixture<AcontecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcontecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcontecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
