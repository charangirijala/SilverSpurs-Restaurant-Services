import { TestBed } from '@angular/core/testing';

import { MenuapiconnectService } from './menuapiconnect.service';

describe('MenuapiconnectService', () => {
  let service: MenuapiconnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuapiconnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
