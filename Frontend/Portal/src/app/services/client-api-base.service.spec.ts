import { TestBed } from '@angular/core/testing';

import { ClientApiBaseService } from './client-api-base.service';

describe('ClientApiBaseService', () => {
  let service: ClientApiBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientApiBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
