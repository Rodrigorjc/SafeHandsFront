import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeONGComponent } from './home-ong.component';

describe('HomeONGComponent', () => {
  let component: HomeONGComponent;
  let fixture: ComponentFixture<HomeONGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeONGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeONGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
