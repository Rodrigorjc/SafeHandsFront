import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosActivosComponent } from './eventos-activos.component';

describe('EventosActivosComponent', () => {
  let component: EventosActivosComponent;
  let fixture: ComponentFixture<EventosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosActivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
