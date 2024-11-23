import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDonacionesComponent } from './info-donaciones.component';

describe('InfoDonacionesComponent', () => {
  let component: InfoDonacionesComponent;
  let fixture: ComponentFixture<InfoDonacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoDonacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
