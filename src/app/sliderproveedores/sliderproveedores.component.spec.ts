import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderproveedoresComponent } from './sliderproveedores.component';

describe('SliderproveedoresComponent', () => {
  let component: SliderproveedoresComponent;
  let fixture: ComponentFixture<SliderproveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderproveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
