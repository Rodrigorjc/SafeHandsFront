import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAdmComponent } from './pedido-adm.component';

describe('PedidoAdmComponent', () => {
  let component: PedidoAdmComponent;
  let fixture: ComponentFixture<PedidoAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
