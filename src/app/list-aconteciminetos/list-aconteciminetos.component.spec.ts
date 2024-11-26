import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAconteciminetosComponent } from './list-aconteciminetos.component';

describe('ListAconteciminetosComponent', () => {
  let component: ListAconteciminetosComponent;
  let fixture: ComponentFixture<ListAconteciminetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAconteciminetosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAconteciminetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
