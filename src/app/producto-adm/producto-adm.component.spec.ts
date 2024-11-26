import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAdmComponent } from './producto-adm.component';

describe('ProductoAdmComponent', () => {
  let component: ProductoAdmComponent;
  let fixture: ComponentFixture<ProductoAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
