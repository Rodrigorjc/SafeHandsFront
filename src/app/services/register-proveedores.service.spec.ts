import { TestBed } from '@angular/core/testing';

import { RegisterProveedoresService } from './register-proveedores.service';

describe('RegisterProveedoresService', () => {
  let service: RegisterProveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
