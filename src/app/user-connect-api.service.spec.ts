import { TestBed } from '@angular/core/testing';

import { UserConnectApiService } from './user-connect-api.service';

describe('UserConnectApiService', () => {
  let service: UserConnectApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserConnectApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
